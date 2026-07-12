import React from 'react';


export default function Tooltip({ children, text, isRight }) {
  return (
    <div className="relative inline-block group">
      {children}
      <div className={`absolute ${isRight ? 'left-full' : 'right-full'} top-1/2 -translate-y-1/2 px-3.5 py-1.5 bg-white rounded-2xl shadow-md/100 font-black text-black text-sm tracking-wider opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:-rotate-3 transition-all duration-150 ease-out whitespace-nowrap z-20`}>
        {text}
      </div>
    </div>
  );
}