'use client';
import React from 'react';
import Link from 'next/link';

const AnimatedButton = ({ 
  text, 
  href, 
  onClick, 
  type = 'button', 
  className = '', 
  disabled = false,
  fullWidth = false,
  variant = 'dark' // 'dark' or 'light'
}) => {
  const isDark = variant === 'dark';
  const isSecondary = variant === 'secondary';
  
  const getBgClass = () => {
    if (isSecondary) return 'bg-bg-soft text-primary hover:text-white';
    if (isDark) return 'bg-primary text-bg-main hover:text-bg-main';
    return 'bg-bg-card text-text-main border border-border hover:text-text-main';
  };

  const buttonClasses = `
    group relative flex items-center justify-center overflow-hidden rounded-full font-semibold transition-colors duration-500 ease-out cursor-pointer select-none
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${getBgClass()}
    py-2.5 px-12 text-sm shadow-sm hover:shadow-md active:scale-95
    ${disabled ? 'opacity-60 pointer-events-none' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {/* Background circle hover effect */}
      <span 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full opacity-0 group-hover:w-[280px] group-hover:h-[280px] group-hover:opacity-100 transition-all duration-700 ease-out z-0 pointer-events-none
          ${isSecondary ? 'bg-primary' : isDark ? 'bg-[#1B3A2D]' : 'bg-bg-soft'}`} 
      />

      {/* Arrow 2 (slides in from left) */}
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute left-[-25%] top-1/2 -translate-y-1/2 w-[18px] h-[18px] z-10 transition-all duration-500 ease-out group-hover:left-[18px] pointer-events-none
          ${isSecondary ? 'fill-primary group-hover:fill-white' : isDark ? 'fill-bg-main' : 'fill-text-main'}`}
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>

      {/* Text label */}
      <span className="relative z-10 -translate-x-2 transition-all duration-500 ease-out group-hover:translate-x-3">
        {text}
      </span>

      {/* Arrow 1 (slides out to right) */}
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute right-[18px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] z-10 transition-all duration-500 ease-out group-hover:right-[-25%] pointer-events-none
          ${isSecondary ? 'fill-primary group-hover:fill-white' : isDark ? 'fill-white' : 'fill-text-main'}`}
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </button>
  );

  if (href) {
    return (
      <Link href={href} className={fullWidth ? 'block w-full' : 'inline-block'}>
        {content}
      </Link>
    );
  }

  return content;
};

export default AnimatedButton;
