import React, { memo } from "react";

function ExportIcon({
  color = "#1A1A1A",
  size = "16",
}: {
  color?: string;
  size?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color}
        d="M5.805 5.14l1.527-1.534v6.393a.667.667 0 101.333 0V3.606l1.527 1.533a.667.667 0 001.093-.217.666.666 0 00-.146-.73L8.472 1.527a.666.666 0 00-.22-.14.667.667 0 00-.507 0 .667.667 0 00-.22.14L4.86 4.193a.67.67 0 00.946.946zM14 9.332a.667.667 0 00-.667.666v2.667a.667.667 0 01-.667.667H3.332a.667.667 0 01-.667-.667V9.999a.667.667 0 10-1.333 0v2.667a2 2 0 002 2h9.333a2 2 0 002-2V9.999A.667.667 0 0014 9.333z"
      ></path>
    </svg>
  );
}

export default memo(ExportIcon);
