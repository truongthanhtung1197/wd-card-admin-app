import { FunctionComponent } from "react";

interface Letter_K_Props {
  size?: number;
}

const Letter_K: FunctionComponent<Letter_K_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#FFE6C8" />
      <path
        d="M28 56V24H31.875V39.875H32.25L46.625 24H51.6875L38.25 38.4375L51.6875 56H47L35.875 41.125L31.875 45.625V56H28Z"
        fill="#525252"
      />
    </svg>
  );
};

export default Letter_K;
