import { FunctionComponent } from "react";

interface Letter_H_Props {
  size?: number;
}

const Letter_H: FunctionComponent<Letter_H_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#CCB796" />
      <path
        d="M28 56V24H31.875V38.25H48.9375V24H52.8125V56H48.9375V41.6875H31.875V56H28Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_H;
