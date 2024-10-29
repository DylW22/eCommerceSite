import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useTheme } from "../context/ThemeContext";
import { getColorGradientUtil } from "../utilities/getColorGradientUtil";
export const useDynamicBackground = (type = "linear", delay = 300) => {
  //const [styles, setStyles] = useState("");
  const [scrollY, setScrollY] = useState(0);
  //let theme = "light";
  const { theme } = useTheme();

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const debouncedHandleScroll = useDebounce(handleScroll, delay);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  const colorGradient = getColorGradientUtil({
    scrollY,
    theme,
    type,
  });
  return { styles: colorGradient, scrollY };
};
