import { FunctionComponent } from "react";

interface Letter_M_Props {
  size?: number;
}

const Letter_M: FunctionComponent<Letter_M_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#EBE673" />
      <path
        d="M24 24H28.625L39.5 50.5625H39.875L50.75 24H55.375V56H51.75V31.6875H51.4375L41.4375 56H37.9375L27.9375 31.6875H27.625V56H24V24Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_M;
