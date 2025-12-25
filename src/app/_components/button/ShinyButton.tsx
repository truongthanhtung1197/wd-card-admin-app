"use client";
import React, { useState } from "react";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className = "",
  onClick,
  ...props
}) => {
  const [shineClass, setShineClass] = useState("");

  const handleMouseEnter = () => {
    setShineClass("shine-forward");
  };

  const handleMouseLeave = () => {
    setShineClass("shine-reverse");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`btn-shiny ${shineClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ShinyButton;
