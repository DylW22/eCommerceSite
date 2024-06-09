import { useEffect, useRef } from "react";
export const useDebounce = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 2000
) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = (...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
  return debouncedCallback;
};
