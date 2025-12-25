import { FunctionComponent } from "react";

interface Letter_Default_Props {
  size?: number;
}

const Letter_Default: FunctionComponent<Letter_Default_Props> = ({
  size = 32,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="80" height="80" rx="40" fill="#FF8D8D" />
    </svg>
  );
};

export default Letter_Default;
