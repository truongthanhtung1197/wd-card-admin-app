import React from "react";

function UserManagementIcon({ color = "#19181A" }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M3.72 12.884a4.167 4.167 0 012.947-1.22h6.666a4.167 4.167 0 014.167 4.167v1.666a.833.833 0 01-1.667 0v-1.666a2.5 2.5 0 00-2.5-2.5H6.667a2.5 2.5 0 00-2.5 2.5v1.666a.833.833 0 01-1.667 0v-1.666c0-1.105.439-2.165 1.22-2.947zM9.999 3.33a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm-4.167 2.5a4.167 4.167 0 118.333 0 4.167 4.167 0 01-8.333 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default UserManagementIcon;
