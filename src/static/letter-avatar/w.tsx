import { FunctionComponent } from "react";

interface Letter_W_Props {
  size?: number;
}

const Letter_W: FunctionComponent<Letter_W_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#AAA5A5" />
      <path
        d="M28.75 56L20 24H23.9375L30.625 50.0625H30.9375L37.75 24H42.125L48.9375 50.0625H49.25L55.9375 24H59.875L51.125 56H47.125L40.0625 30.5H39.8125L32.75 56H28.75Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_W;
