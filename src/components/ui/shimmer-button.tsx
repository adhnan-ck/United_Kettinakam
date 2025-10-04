'use client'
import React from 'react';

// The main App component that renders our ShimmerButton
export default function ShimmerButton() {
  const customCss = `
    /* This is the key to the seamless animation.
      The @property rule tells the browser that '--angle' is a custom property
      of type <angle>. This allows the browser to smoothly interpolate it
      during animations, preventing the "jump" at the end of the loop.
    */
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }

    /* The keyframe animation simply transitions the --angle property
      from its start (0deg) to its end (360deg).
    */
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;

  return (
    // Main container to center the button on the page
    <div className="flex items-center justify-center font-sans">
      <style>{customCss}</style>
      <button className="relative inline-flex items-center justify-center font-bold p-[1.5px] bg-red-300 dark:bg-black rounded-md overflow-hidden group">
        <div 
          className="absolute inset-0"
          style={{
            background: 'conic-gradient(from var(--angle), transparent 25%, #06d409ff, transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-white dark:text-white bg-red-600 dark:bg-gray-900 rounded-md group-hover:bg-green-500 dark:group-hover:bg-green-800 transition-colors duration-300">
          Request Blood
        </span>
      </button>
    </div>
  );
}
