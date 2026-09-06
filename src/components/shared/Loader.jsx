"use client"

import { Spinner } from '@heroui/react';

const Loader = ({ text, size = "lg", className = "text-tc-primary" }) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <Spinner size={size} className={className} />
            {text && <span className="text-tc-muted text-sm">{text}</span>}
        </div>
    );
};

export default Loader;
