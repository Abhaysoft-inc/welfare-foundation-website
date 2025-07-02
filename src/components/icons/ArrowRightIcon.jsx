import React from 'react';

const ArrowRightIcon = ({ className = "w-4 h-4", ...props }) => {
    return (
        <svg 
            className={className} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            {...props}
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
            />
        </svg>
    );
};

export default ArrowRightIcon;
