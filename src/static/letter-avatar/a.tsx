import { FunctionComponent } from "react";

interface Letter_A_Props {
  size?: number;
}

const Letter_A: FunctionComponent<Letter_A_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#FF8D8D" />
      <path
        d="M30.0625 56H26L37.75 24H41.75L53.5 56H49.4375L39.875 29.0625H39.625L30.0625 56ZM31.5625 43.5H47.9375V46.9375H31.5625V43.5Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_A;
