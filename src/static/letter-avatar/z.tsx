import { FunctionComponent } from "react";

interface Letter_Z_Props {
  size?: number;
}

const Letter_Z: FunctionComponent<Letter_Z_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#C7C7D0" />
      <path
        d="M29.1875 56V53.1875L46.4375 27.4375H29V24H51.0625V26.8125L33.8125 52.5625H51.25V56H29.1875Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_Z;
