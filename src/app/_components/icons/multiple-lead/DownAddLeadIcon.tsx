import React from "react";

function DownAddLeadIcon({ color }: { color?: string }) {
  return (
    <svg
      height="16"
      width="16"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.52859 5.5312C3.78894 5.27085 4.21105 5.27085 4.4714 5.5312L8 9.0598L11.5286 5.5312C11.7889 5.27085 12.2111 5.27085 12.4714 5.5312C12.7317 5.79155 12.7317 6.21366 12.4714 6.47401L8.4714 10.474C8.21105 10.7344 7.78894 10.7344 7.52859 10.474L3.52859 6.47401C3.26824 6.21366 3.26824 5.79155 3.52859 5.5312Z"
        fill={color || "#AC2125"}
        fillRule="evenodd"
      />
    </svg>
  );
}

export default DownAddLeadIcon;
