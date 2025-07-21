import Image from 'next/image';

export default function IndianRupeeIcon({ width = 24, height = 24, className = '', ...props }) {
    return (
        <Image
            src="/Indian_Rupee_symbol.svg"
            alt="Indian Rupee Symbol"
            width={width}
            height={height}
            className={className}
            {...props}
        />
    );
}
