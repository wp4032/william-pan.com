'use client';

import React from 'react'
import './feature.css'

interface FeatureProps {
  title: string;
  text: string;
  position?: string;
  link?: string;
}

const Feature: React.FC<FeatureProps> = ({ title, text, position, link }) => {
  return (
    <div className="william__features-container__feature">
    <div className="william__features-container__feature-title">
      <div />
      <h1><a href={link}>{title}</a></h1>
      <h2>{position}</h2>
    </div>
    
    <div className="william__features-container__feature-text">
      {text}
    </div>
  </div>
  )
}

export default Feature