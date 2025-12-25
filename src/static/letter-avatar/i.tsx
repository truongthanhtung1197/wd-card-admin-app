import { FunctionComponent } from "react";

interface Letter_I_Props {
  size?: number;
}

const Letter_I: FunctionComponent<Letter_I_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#DCEBC3" />
      <path d="M41.875 24V56H38V24H41.875Z" fill="#525252" />
    </svg>
  );
};

export default Letter_I;
