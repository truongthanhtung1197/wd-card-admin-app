import { FunctionComponent } from "react";

interface Letter_V_Props {
  size?: number;
}

const Letter_V: FunctionComponent<Letter_V_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#FFD2D7" />
      <path
        d="M30.0625 24L39.5625 50.9375H39.9375L49.4375 24H53.5L41.75 56H37.75L26 24H30.0625Z"
        fill="#525252"
      />
    </svg>
  );
};

export default Letter_V;
