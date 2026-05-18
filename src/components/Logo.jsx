import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-[#11281F] ${className}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        {/* Medical Cross */}
        <path d="M14 2h-4a1 1 0 00-1 1v7H2a1 1 0 00-1 1v4a1 1 0 001 1h7v7a1 1 0 001 1h4a1 1 0 001-1v-7h7a1 1 0 001-1v-4a1 1 0 00-1-1h-7V3a1 1 0 00-1-1z" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight">
        DocAppoint
      </span>
    </div>
  );
}
