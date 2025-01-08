"use client"

import { useEffect } from 'react'

export function CopyButtonScript() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.copy-button')
    
    buttons.forEach(button => {
      button.addEventListener('click', async () => {
        const code = button.getAttribute('data-code')
        if (code) {
          await navigator.clipboard.writeText(code)
          
          // Change icon to checkmark
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full"><polyline points="20 6 9 17 4 12"></polyline></svg>`
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-full w-full"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`
          }, 2000)
        }
      })
    })
  }, [])

  return null
}