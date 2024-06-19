import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export const useDynamicBackground = (type = "linear", delay = 100) => {
  const [styles, setStyles] = useState("");
  const [scrollY, setScrollY] = useState(0);
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
    if (type === "lineaar") {
      console.log("Hello");
    }
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  const getGradientColor = () => {
    //const color1 = [255, 138, 0]; // RGB values for initial color
    //const color2 = [229, 46, 113]; // RGB values for final color
    //const color1 = [252, 70, 70]; //Premium
    //const color2 = [229, 46, 113]; //Premium

    const color1 = [245, 177, 30]; //Super premium
    const color2 = [167, 30, 245]; //Super premium

    //https://mycolor.space/gradient3
    //https://cssgradient.io/
    //Linear and radial are different
    //https://chatgpt.com/c/7e0e9780-508e-4fe6-b8a6-750401afc04a

    // Calculate the RGB values based on scroll position
    const red =
      color1[0] +
      Math.floor((color2[0] - color1[0]) * (scrollY / window.innerHeight));
    const green =
      color1[1] +
      Math.floor((color2[1] - color1[1]) * (scrollY / window.innerHeight));
    const blue =
      color1[2] +
      Math.floor((color2[2] - color1[2]) * (scrollY / window.innerHeight));
    return `rgb(${red}, ${green}, ${blue})`;
  };
  useEffect(() => {
    const updateStyles = () => {
      const colorGradient = getGradientColor();
      setStyles(colorGradient);
    };
    updateStyles();
    return () => {
      updateStyles();
    };
  }, [scrollY]);

  return { styles, scrollY };
};
