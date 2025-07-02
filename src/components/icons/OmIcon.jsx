import React from 'react';

const OmIcon = ({ className = "w-4 h-4", ...props }) => {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
            {...props}
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M9 12c0-.5.2-1 .5-1.4.3-.4.7-.6 1.1-.6.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4c-.4 0-.8-.2-1.1-.6-.3-.4-.5-.9-.5-1.2z" />
        </svg>
    );
};

export default OmIcon;
