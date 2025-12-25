import React from "react";

function ChevronIcon({ color = "#000" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M13.09 4.408a.833.833 0 010 1.179l-4.41 4.41 4.41 4.411a.834.834 0 01-1.178 1.179l-5-5a.833.833 0 010-1.179l5-5a.833.833 0 011.179 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default ChevronIcon;
