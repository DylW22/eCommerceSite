import { Button, Image } from "react-bootstrap";

import { useTheme } from "../../context/ThemeContext";
import Moon from "../../assets/moon.svg";
import Sun from "../../assets/sun2.svg";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button onClick={toggleTheme} style={{ height: "auto", width: "50px" }}>
      <Image
        style={{
          height: "100%",
          width: "100%",
          objectFit: "contain",
        }}
        src={theme === "light" ? Moon : Sun}
      />
    </Button>
  );
};
