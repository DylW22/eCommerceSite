import { useEffect, useState } from "react";

export const useRotatingItems = <T,>(
  items: T[],
  N: number,
  period: number
): T[] => {
  const [currentItems, setCurrentItems] = useState<T[]>(items.slice(0, N));
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    console.log("Items changing");
    // setCurrentItems(items.slice(0, N));

    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + N) % items.length;
        setCurrentItems(items.slice(newIndex, newIndex + N));
        return newIndex;
      });
    }, period);
    return () => clearInterval(interval);
  }, [items, N, period]);
  return currentItems;
};
