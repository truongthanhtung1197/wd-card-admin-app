import React from "react";

interface HighlightedTextProps {
    text: string;
    isOldValue?: boolean;
    className?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
    text,
    isOldValue = false,
    className = ""
}) => {
    return (
        <span className={`font-bold px-2 py-1 rounded ${isOldValue
            ? 'text-red-600'
            : 'text-green-600'
            } ${className}`}>
            {text}
        </span>
    );
};

export default HighlightedText;
