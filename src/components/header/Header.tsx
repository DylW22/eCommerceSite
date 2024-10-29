import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { NavbarCartButton } from "./NavbarCartButton";
import { useAuth } from "../../context/AuthContext";
import { SearchBar } from "./SearchBar";
import { AccountDropDown } from "./AccountDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Navbar } from "./Navbar";
import { useDynamicBackground } from "../../hooks/useDynamicBackground";

export function Header() {
  const { cartQuantity } = useShoppingCart();
  const { state } = useAuth();
  const { isAuthenticated } = state;
  const { styles } = useDynamicBackground("linear", 50);
  return (
    <Container
      fluid
      className={`p-2 sticky-top`}
      style={{ background: styles }}
    >
      <NavbarBs
        expand
        sticky="top"
        className="d-flex flex-column align-items-start"
      >
        <Container fluid className="d-flex w-100 m-0 p-0">
          <Container fluid className="d-flex m-0 p-0">
            <Navbar />
            <Container fluid className="d-none d-md-flex p-0 m-0">
              <ThemeToggle />
            </Container>
          </Container>
          <Container
            fluid
            className="d-none d-md-flex m-0 p-0 flex-grow-1 w-100 position-relative"
          >
            <SearchBar />
          </Container>
          <Container fluid className="d-flex w-auto text-end m-0 p-0">
            {isAuthenticated ? (
              <AccountDropDown />
            ) : (
              <Nav.Link to="/login" as={NavLink}>
                <Button>Login</Button>
              </Nav.Link>
            )}
          </Container>

          {cartQuantity > 0 ? (
            <div
              className="text-end ms-2 me-4 p-0"
              style={{ width: "120px", height: "50px" }}
            >
              <NavbarCartButton />
            </div>
          ) : (
            <div
              className="ms-2 me-3 p-0"
              style={{ width: "120px", height: "50px" }}
            ></div>
          )}
        </Container>
      </NavbarBs>
    </Container>
  );
}
