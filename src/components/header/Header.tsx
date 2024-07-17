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
  const { styles } = useDynamicBackground();
  return (
    <Container
      fluid
      className={`p-2 sticky-top `}
      style={{ background: styles }}
    >
      <NavbarBs expand sticky="top" className="">
        <Container fluid className="d-flex justify-content-between">
          <Navbar />
          <Container fluid className="p-0">
            <div className="d-flex align-items-center justify-content-end">
              <div className="d-none d-md-flex align-items-center justify-content-end w-100">
                <ThemeToggle />
                <SearchBar />
                {isAuthenticated ? (
                  <AccountDropDown />
                ) : (
                  <Nav.Link to="/login" as={NavLink}>
                    <Button>Login</Button>
                  </Nav.Link>
                )}
              </div>
              <div className="text-black">
                {cartQuantity > 0 ? (
                  <div
                    style={{ width: "80px", height: "20px" }}
                    className="d-flex align-items-center px-2"
                  >
                    <NavbarCartButton />
                  </div>
                ) : (
                  <div style={{ width: "80px" }}></div>
                )}
              </div>
            </div>
          </Container>
        </Container>
      </NavbarBs>
    </Container>
  );
}
