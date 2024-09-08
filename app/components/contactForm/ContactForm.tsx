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
    <form className="william__header-content__input gap-6" onSubmit={handleSubmit}>
      <input id="text" type="text" name="text" placeholder="Ask William about ..." className='text-center rounded-full'></input>
      <ValidationError
        prefix="Text"
        field="text"
        errors={state.errors}
      />
      <motion.button
        type="submit"
        disabled={state.submitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}> Ask </motion.button>
    </form>
  )
}

export default ContactForm