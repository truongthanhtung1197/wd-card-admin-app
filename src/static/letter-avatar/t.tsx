import { FunctionComponent } from "react";

interface Letter_T_Props {
  size?: number;
}

const Letter_T: FunctionComponent<Letter_T_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#D2A3A6" />
      <path
        d="M28 27.4375V24H52V27.4375H41.9375V56H38.0625V27.4375H28Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_T;
