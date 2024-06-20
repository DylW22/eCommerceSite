import { useState } from "react";

interface useFadeoutReturn {
  toFade: boolean;
  applyFade: () => void;
}

export const useFadeout = (duration: number): useFadeoutReturn => {
  const [toFade, setToFade] = useState<boolean>(false);

  const applyFade = (): void => {
    setToFade(true);
    setTimeout(() => {
      setToFade(false);
    }, duration);
  };
  return { toFade, applyFade };
};
