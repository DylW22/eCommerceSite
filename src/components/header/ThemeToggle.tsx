import { Button, Image } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import Moon from "../../assets/moon2.png";
import Sun from "../../assets/sun2.svg";
export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      className={`${theme === "light" ? "bg-dark" : "bg-light"} mx-1`}
      onClick={toggleTheme}
      style={{ height: "auto", width: "50px" }}
    >
      <Image
        style={{
          height: "25px",
          width: "25px",
          objectFit: "contain",
        }}
        src={theme === "light" ? Moon : Sun}
      />
    </Button>
  );
};
