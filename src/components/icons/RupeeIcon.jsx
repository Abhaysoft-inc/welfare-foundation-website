export default function RupeeIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Correct Indian Rupee Symbol */}
            <path d="M6 3h12" />
            <path d="M6 8h12" />
            <path d="m6 13 3.5 7 5.5-11" />
            <path d="M6 13h3" />
        </svg>
    );
}
