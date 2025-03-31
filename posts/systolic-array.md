---
title: 'How Systolic Arrays Work'
subtitle: 'A visual and intuitive guide to parallel computation in neural network accelerators'
date: '2025-03-31'
minutes: '8'
image: '/blog/systolicarray/systolic_array_header.png'
sidebar: 'How Systolic Arrays Work'
---

![systolic_array_header](/blog/systolicarray/systolic_array_header.png)

Modern AI models are powered by **billions of matrix multiplications**, and at the hardware level, one of the most elegant and efficient ways to perform them is via **systolic arrays**. These grid-like accelerators rhythmically pulse data through a mesh of **processing elements (PEs)**—enabling massive parallelism, high throughput, and exceptional data reuse with minimal memory movement.

Despite being foundational to cutting-edge hardware—most notably in Google’s **Tensor Processing Unit (TPU)**—systolic arrays often remain abstract and poorly visualized. There’s a lack of intuitive, granular tools that show how data propagates, accumulates, and interacts across cycles within these arrays.

**So I built one.**

This post introduces a step-by-step **interactive systolic array simulator**, designed to break down the flow of inputs, weights, and partial sums in a visual and digestible way. Whether you’re an ML hardware architect, a systems researcher, or just curious about how deep learning operates at the silicon level, this guide is for you.

---

## Why Accelerators for DNNs?

Deep Neural Networks (DNNs) are fundamentally **compute-bound**. General-purpose processors like CPUs lack the architectural specialization to meet their performance and energy demands. That’s where **hardware accelerators** come in—ASICs and NPUs designed to exploit specific computation patterns at scale.

But not all computations benefit equally from hardware acceleration. For an accelerator to deliver meaningful gains, the workload must exhibit:

- **Parallelism**: allowing thousands of operations to execute simultaneously.
- **Locality**: enabling data reuse without repeated trips to high-latency, high-energy memory like DRAM.

These two characteristics—**compute density** and **data reuse**—make DNNs, particularly **Convolutional Neural Networks (CNNs)** and **Transformers**, ideal accelerator targets.

---

## Systolic Arrays Crush CNNs

Convolution layers dominate the workload in CNNs, often accounting for over 90% of the total FLOPs in vision models. A single layer can involve billions of **MAC (multiply-accumulate)** operations. But to accelerate convolutions efficiently, it’s not just about raw FLOPs—what matters is **arithmetic intensity**: the ratio of compute operations to memory accesses.

### Why arithmetic intensity?

Because **data movement is expensive**. Fetching data from DRAM can consume orders of magnitude more energy than performing a MAC. Here's a quick look at the memory hierarchy:

| Memory Level     | Latency       | Energy per 16B | Capacity        | Notes |
|------------------|---------------|----------------|------------------|-------|
| **DRAM (off-chip)**  | 50–200 cycles | 100–1000 pJ    | GBs              | High energy and latency, used for model storage |
| **SRAM (on-chip)**   | 1–4 cycles    | 1–10 pJ        | 32KB–1MB         | Used for tiles of weights/activations |
| **Register File**    | 1 cycle       | 0.1–0.5 pJ     | 0.5–2KB/core     | Closest to compute, best for tight loops |

To minimize expensive DRAM accesses, convolutional data—**input feature maps, filter weights, and partial outputs**—must be carefully **tiled** and **reused** as much as possible within the on-chip SRAM and registers.

This is where **systolic arrays** shine.

A convolution operation can be restructured as a series of **general matrix multiplications (GEMMs)** using techniques like **im2col** or **Winograd transformation**. These GEMMs map directly onto systolic arrays, which are specifically designed to compute large matrix products with high throughput and low memory movement.

### How convolution maps to systolic execution

Let’s consider a basic 7D convolution loop nest:

```c
for (int n = 0; n < batch; n++) {
  for (int oc = 0; oc < output_channels; oc++) {
    for (int ic = 0; ic < input_channels; ic++) {
      for (int y = 0; y < output_height; y++) {
        for (int x = 0; x < output_width; x++) {
          for (int ky = 0; ky < filter_height; ky++) {
            for (int kx = 0; kx < filter_width; kx++) {
              output[n][oc][y][x] +=
                input[n][ic][y+ky][x+kx] * weight[oc][ic][ky][kx];
}}}}}}} 
```

This nested structure represents convolution as an accumulation over spatial and channel dimensions—effectively a batched inner product. By flattening the spatial dimensions, we can transform this into a **matrix multiplication problem**, where:

- Rows represent **flattened receptive fields** (input tiles),
- Columns represent **flattened filter weights**,
- Outputs represent **partial sums per output channel and position**.

This matrix multiplication structure maps cleanly to a **weight-stationary systolic array**:

- **Weights** are preloaded into the PEs and held stationary to maximize reuse.
- **Input tiles** stream in from the left, traversing horizontally.
- **Partial sums** accumulate vertically through the array and flow out the bottom.

This configuration minimizes memory bandwidth requirements by localizing data movement within the array and ensuring high utilization of every MAC unit. In practice, systolic arrays can achieve **orders-of-magnitude energy efficiency improvements** over CPU or even GPU-based implementations for CNN inference and training workloads.

---

### What About Transformers?

While Transformers lack the spatial reuse patterns of CNNs, they rely heavily on **batched GEMMs** for attention, projection, and feed-forward layers. These operations are structurally regular and dense—making them excellent candidates for systolic execution.

In fact, this is exactly why Google’s **TPUs**—which feature large systolic arrays as their compute backbone—excel at both CNN and Transformer workloads.

---

## What is a Systolic Array?

A **systolic array** is a two-dimensional grid of **Processing Elements (PEs)**—typically multiply-accumulate (MAC) units—connected in a pipelined and synchronized architecture. Each PE performs a simple operation and passes intermediate results to its neighboring elements, enabling highly parallel and efficient computation with minimal memory overhead.

In a typical systolic array:

- Each PE receives an **input activation** from the left, a **weight** from the top, and a **partial sum** from the top neighbor.
- It performs a **multiply-accumulate (MAC)** operation: multiplying the incoming input with the stationary weight and adding the incoming partial sum.
- The result is then propagated **downward** to the next PE in the column.

This setup allows for **streaming inputs, fixed weights, and flowing outputs**, achieving high throughput due to the continuous data movement and localized communication.

### Weight-Stationary Systolic Arrays

The most common configuration is the **weight-stationary** systolic array, where:

- **Weights** are preloaded from the top and held stationary within each PE.
- **Inputs** stream in from the left across rows.
- **Partial sums** accumulate as they move down the columns.

Let’s walk through a concrete example: a 2×2 matrix multiplication using a 2×2 weight-stationary systolic array. Consider the input matrix $ I $ and weight matrix $ W $:

$$
W = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}, \quad I = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}
$$

---

### Step 1

At time step 1, the first input value `1.00` and the first weight `1.00` enter the top-left PE (MAC[0][0]). Since this is the initial step, no partial sum has been propagated yet. The PE computes:

$$
1.00 \times 1.00 + 0.00 = 1.00
$$

This partial result is passed **downward** to the PE below.

<SystolicSimulator ifmap_buf={[[1, 2], [2, 1]]} weight_buf={[[1, 2], [2, 1]]} step_count={1} frozen_state="idle" looping={true}/>

---

### Step 2

Inputs and weights begin to propagate through the array:

- The input `1.00` shifts right to MAC[0][1].
- The corresponding weight `2.00` flows down into MAC[0][1] and MAC[1][0].
- The next input `2.00` enters from the left into MAC[0][0] and MAC[1][0].
- Partial sum `1.00` flows down into MAC[1][0].

PE computations:

- **MAC[0][0]**: $ 2.00 \times 1.00 = 2.00 $
- **MAC[0][1]**: $ 1.00 \times 2.00 = 2.00 $
- **MAC[1][0]**: $ 2.00 \times 2.00 + 1.00 = 5.00 $

The value `5.00` now corresponds to the **top-left output element** of the matrix multiplication.

<SystolicSimulator ifmap_buf={[[1, 2], [2, 1]]} weight_buf={[[1, 2], [2, 1]]} step_count={2} frozen_state="idle" looping={true}/>

---

### Step 3

Data continues to flow:

- Input `2.00` moves right to MAC[1][1]; input `1.00` enters into MAC[1][0].
- Weight `1.00` drops into MAC[1][1].
- Partial sums propagate downward.

PE computations:

- **MAC[0][1]**: $ 2.00 \times 2.00 = 4.00 $
- **MAC[1][0]**: $ 1.00 \times 2.00 + 2.00 = 4.00 $
- **MAC[1][1]**: $ 2.00 \times 1.00 + 2.00 = 4.00 $

These values populate the **top-right** and **bottom-left** of the result matrix.

<SystolicSimulator ifmap_buf={[[1, 2], [2, 1]]} weight_buf={[[1, 2], [2, 1]]} step_count={3} frozen_state="idle" looping={true}/>

---

### Step 4

Final step:

- Input `1.00` reaches MAC[1][1].
- Weight `1.00` is already held stationary.

PE computation:

- **MAC[1][1]**: $ 1.00 \times 1.00 + 4.00 = 5.00 $

This gives the final **bottom-right** value of the output matrix.

<SystolicSimulator ifmap_buf={[[1, 2], [2, 1]]} weight_buf={[[1, 2], [2, 1]]} step_count={4} frozen_state="idle" looping={true}/>

---

The final output matrix is:

$$
O = I \times W = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix} \times \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix} = \begin{bmatrix} 5 & 4 \\ 4 & 5 \end{bmatrix}
$$

This example illustrates how systolic arrays achieve efficient matrix multiplication through data pipelining, stationary weight reuse, and localized accumulation.

---

## Limitations

Systolic arrays are powerful, but not universal. Their limitations include:

- **Lack of locality or parallelism** means poor performance. If your computation is sparse, irregular, or doesn’t reuse data, systolic arrays will just sit idle.
- **Fixed dataflow patterns** can make them inflexible for general-purpose workloads.
- **Size mismatch** between array and workload can lead to underutilization.
- **IO bottlenecks**: feeding data into and out of the array fast enough is non-trivial.

Still, when the workload fits, systolic arrays provide **best-in-class energy efficiency and throughput**, which is why they power some of the fastest AI chips in the world.

---

## Systolic Array Simulator

Feel free to play around with the systolic array below by clicking the right button to advance the systolic array and the left button to reverse a step!

<SystolicSimulator frozen={false}/>

The source code for this simulator is available on [GitHub](https://github.com/wp4032/systolic-array-simulator). Feel free to use it in your own projects or educational materials!