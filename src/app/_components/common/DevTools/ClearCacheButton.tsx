"use client";

import React from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { useSelector } from "react-redux";

import { AuthSelector } from "@/store/Auth";
import { clearAllAuthData } from "@/utils/auth.utils";

import MyTooltip from "../MyTooltip";


interface ClearCacheButtonProps {
  className?: string;
}

export default function ClearCacheButton({
  className = "",
}: ClearCacheButtonProps) {
  const auth = useSelector(AuthSelector.selectAuthState);

  const handleClearCache = () => {
    try {
      clearAllAuthData();

      // Force page reload to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error("Error clearing cache:", error);
      alert(
        "Error clearing cache. Please try manually clearing browser storage.",
      );
    }
  };

  // Don't show if no mismatch detected
  // if (!shouldShowClearButton()) {
  //   return null;
  // }

  return (
    <div className="group relative">
      <MyTooltip content="Clear cache">
        <button
          onClick={handleClearCache}
          className={`
          flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 
          p-2 text-sm font-medium text-white shadow-lg
          transition-all duration-200 hover:scale-105 hover:from-red-600 
          hover:to-red-700 hover:shadow-xl active:scale-95
          ${className}
        `}
          title="Clear stale cache data"
        >
          <FaArrowsRotate />
        </button>
      </MyTooltip>
    </div>
  );
}
