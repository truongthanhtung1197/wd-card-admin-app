import React from "react";

function WarningIcon({
  size = "20",
  color = "#FF3B30",
}: {
  size?: string;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g clipPath="url(#clip0_6620_474)">
        <g>
          <path
            fill={color}
            d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm-.932 4.063c0-.173.14-.313.312-.313h1.24c.173 0 .313.14.313.313v7.5c0 .172-.14.312-.313.312H9.38a.313.313 0 01-.313-.313v-7.5zM10 16.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
          ></path>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_6620_474">
          <path fill="#fff" d="M0 0H20V20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default WarningIcon;
