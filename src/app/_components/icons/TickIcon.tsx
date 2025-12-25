import React, { memo } from "react";

function TickIcon({ color = "#AC2125" }: { color?: string }) {
  return (
    <svg
      height="8"
      width="11"
      fill="none"
      viewBox="0 0 11 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.7507 0.226756C11.057 0.529097 11.057 1.01929 10.7507 1.32163L5.03076 6.96774C4.41817 7.57242 3.42497 7.57243 2.81238 6.96774L0.22972 4.41841C-0.0765734 4.11606 -0.0765734 3.62587 0.22972 3.32353C0.536014 3.02119 1.03261 3.02119 1.33891 3.32353L3.92157 5.87287L9.64149 0.226756C9.94778 -0.0755854 10.4444 -0.0755854 10.7507 0.226756Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default memo(TickIcon);
