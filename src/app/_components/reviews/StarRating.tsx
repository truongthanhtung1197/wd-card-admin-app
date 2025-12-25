"use client";
import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readOnly?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, size = 18, readOnly = false, className }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => !readOnly && onChange?.(s)}
          className="p-0"
          disabled={readOnly}
          aria-label={`rate-${s}`}
        >
          <FaStar size={size} className={s <= value ? "text-yellow-400" : "text-gray-300"} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
