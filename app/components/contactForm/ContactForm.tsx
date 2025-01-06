'use client';

import React from 'react'
import { useForm, ValidationError } from '@formspree/react';
import { motion } from "framer-motion";


const ContactForm = () => {
  const [state, handleSubmit] = useForm("mnqrjgkr");
  if (state.succeeded) {
    return <p className="william__footer-content__inputtext">Thanks for submitting!</p>;
  }

  return (
    <form className="w-4/5 py-4 sm:py-8 px-0 flex gap-6" onSubmit={handleSubmit}>
      <input id="text" type="text" name="text" placeholder="Ask William ..." className='flex-2 w-full min-h-[35px] lg:min-h-[50px] font-[--font-family] text-md lg:text-xl leading-[27px] 
               text-white/50 bg-white/5 border-none px-8 outline-none rounded-full'></input>
      <ValidationError
        prefix="Text"
        field="text"
        errors={state.errors}
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="submit"
          disabled={state.submitting}
          className='flex-[0.6] w-full min-h-[35px] lg:min-h-[50px] bg-white text-black rounded-full 
               font-[--font-family] font-bold text-md lg:text-xl leading-[27px] cursor-pointer 
               outline-none px-4 border-none text-bold'
        >
          Ask
        </button>
      </motion.div>
    </form>
  )
}

export default ContactForm