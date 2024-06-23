import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <Nav className="fw-bold">
      <Nav.Link
        className={`${theme === "dark" ? "text-white" : ""}`}
        to="/"
        as={NavLink}
      >
        Home
      </Nav.Link>
      <Nav.Link
        className={`${theme === "dark" ? "text-white" : ""}`}
        to="/store"
        as={NavLink}
      >
        Store
      </Nav.Link>
      <Nav.Link
        className={`${theme === "dark" ? "text-white" : ""}`}
        to="/about"
        as={NavLink}
      >
        About
      </Nav.Link>
      <Nav.Link
        className={`${theme === "dark" ? "text-white" : ""}`}
        to="/testpage"
        as={NavLink}
      >
        TestPage
      </Nav.Link>
    </Nav>
  );
};
