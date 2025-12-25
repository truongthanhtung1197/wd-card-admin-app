import { FunctionComponent } from "react";

interface Letter_F_Props {
  size?: number;
}

const Letter_F: FunctionComponent<Letter_F_Props> = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#E781BC" />
      <path
        d="M30 56V24H49.1875V27.4375H33.875V38.25H47.75V41.6875H33.875V56H30Z"
        fill="white"
      />
    </svg>
  );
};

export default Letter_F;
