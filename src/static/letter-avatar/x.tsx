import { FunctionComponent } from "react";

interface Letter_X_Props {
  size?: number;
}

const Letter_X: FunctionComponent<Letter_X_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#69785F" />
      <path
        d="M31.5625 24L39.8125 37.3125H40.0625L48.3125 24H52.875L42.8125 40L52.875 56H48.3125L40.0625 42.9375H39.8125L31.5625 56H27L37.3125 40L27 24H31.5625Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_X;
