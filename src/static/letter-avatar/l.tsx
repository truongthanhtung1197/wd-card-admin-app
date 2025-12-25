import { FunctionComponent } from "react";

interface Letter_L_Props {
  size?: number;
}

const Letter_L: FunctionComponent<Letter_L_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#F0B95F" />
      <path d="M31 56V24H34.875V52.5625H49.75V56H31Z" fill="white" />
    </svg>
  );
};

export default Letter_L;
