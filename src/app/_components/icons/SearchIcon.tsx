import React from "react";

function SearchIcon({
  fill = "#1A1A1A",
  size = 20,
}: {
  fill?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={fill}
        d="M18.09 16.907L15 13.841a7.5 7.5 0 10-1.16 1.158l3.067 3.067a.834.834 0 001.184 0 .833.833 0 000-1.159zM9.167 15a5.833 5.833 0 110-11.666 5.833 5.833 0 010 11.666z"
      ></path>
    </svg>
  );
}

export default SearchIcon;
