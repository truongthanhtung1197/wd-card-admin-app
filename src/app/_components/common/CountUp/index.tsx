"use client";

import CountUp, { CountUpProps } from "react-countup";

interface Props extends CountUpProps {}

export default function MyCountUp({ ...props }: Props) {
  return <CountUp {...props} />;
}
