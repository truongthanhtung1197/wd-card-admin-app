import { FunctionComponent } from "react";

interface Letter_Y_Props {
  size?: number;
}

const Letter_Y: FunctionComponent<Letter_Y_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#D1B9DA" />
      <path
        d="M27 24H31.4375L40.3125 38.9375H40.6875L49.5625 24H54L42.4375 42.8125V56H38.5625V42.8125L27 24Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_Y;
