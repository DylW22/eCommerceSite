import { Outlet, useFetcher } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Container } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
export function Root() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "light" ? "custom-lightGray" : "bg-midnight text-white"
      }`}
    >
      <Header />
      <Outlet />
      {/*To fix positioning */}
      {/*<Container className="mb-4">
        <Outlet />
      </Container>*/}
    </div>
  );
}
