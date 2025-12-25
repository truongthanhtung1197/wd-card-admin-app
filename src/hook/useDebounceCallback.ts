import { useRef } from "react";

export function useDebounceCallback(callback: (...args: any[]) => void, delay: number = 500) {
  const timer = useRef<NodeJS.Timeout>();

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
