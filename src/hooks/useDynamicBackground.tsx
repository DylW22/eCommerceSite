import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { useTheme } from "../context/ThemeContext";
import { getColorGradientUtil } from "../utilities/getColorGradientUtil";
export const useDynamicBackground = (type = "linear", delay = 100) => {
  const [styles, setStyles] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { theme } = useTheme();
  //const debouncedScrollY = useDebounce(scrollY, delay);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const handleDebouncedScroll = () => {
    handleScroll();
  };
  const debouncedHandleScroll = useDebounce(handleDebouncedScroll, delay);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    /* if (type === "lineaar") {
      console.log("Hello");
    }*/
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    const updateStyles = () => {
      const colorGradient = getColorGradientUtil({ scrollY, theme, type });

      setStyles(colorGradient);
    };
    updateStyles();
    return () => {
      updateStyles();
    };
  }, [scrollY, theme]);

  return { styles, scrollY };
};
