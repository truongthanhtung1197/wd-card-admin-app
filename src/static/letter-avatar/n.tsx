import { FunctionComponent } from "react";

interface Letter_N_Props {
  size?: number;
}

const Letter_N: FunctionComponent<Letter_N_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#EBDCC3" />
      <path
        d="M52.375 24V56H48.625L31.1875 30.875H30.875V56H27V24H30.75L48.25 49.1875H48.5625V24H52.375Z"
        fill="#525252"
      />
    </svg>
  );
};

export default Letter_N;
