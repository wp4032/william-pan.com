'use client';

import React from 'react'
import { motion } from "framer-motion"
import './showcasepopup.css'

interface ShowcaseBackdropProps {
  children: React.ReactNode;   // Defines that children can be any valid React node
  onClick: () => void;         // onClick is a function with no arguments that returns void
}

const ShowcaseBackdrop: React.FC<ShowcaseBackdropProps> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="william__showcase-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default ShowcaseBackdrop;