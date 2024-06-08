import {
  Container,
  Nav,
  Navbar as NavbarBs,
  Dropdown,
  Button,
  Image,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavbarCartButton } from "./NavbarCartButton";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { SearchBar } from "./SearchBar";
import Moon from "../assets/moon.svg";
import Sun from "../assets/sun2.svg";

export function Navbar() {
  const { cartQuantity } = useShoppingCart();
  const { theme, setTheme } = useTheme();
  const { state, logout } = useAuth();
  const { isAuthenticated } = state;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <NavbarBs
        sticky="top"
        className="bg-white shadow-sm mb-3"

        /*className={`navbar ${
          theme === "dark" ? "dark-theme" : " "
        } shadow-sm mb-3`}*/
      >
        <Container className="d-flex justify-content-between">
          <Nav className="">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to="/store" as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              About
            </Nav.Link>
            <Nav.Link to="/testpage" as={NavLink}>
              TestPage
            </Nav.Link>
          </Nav>
          <Container className="d-flex justify-content-end align-items-center">
            <Button
              onClick={toggleTheme}
              style={{ height: "auto", width: "70px" }}
            >
              <Image
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                src={theme === "light" ? Moon : Sun}
              />
            </Button>
            {<SearchBar />}

            <Container
              className="d-flex justify-content-end align-items-center"
              style={{ position: "relative" }}
            >
              {isAuthenticated ? (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Account
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/account">Profile</Dropdown.Item>
                    <Dropdown.Item href="/history">Past orders</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav.Link to="/login" as={NavLink}>
                  <Button>Login</Button>
                </Nav.Link>
              )}
            </Container>

            {cartQuantity > 0 && <NavbarCartButton />}
          </Container>
        </Container>
      </NavbarBs>
    </>
  );
}
