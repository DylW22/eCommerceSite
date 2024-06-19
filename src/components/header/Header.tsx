import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";

import { NavbarCartButton } from "./NavbarCartButton";
import { useAuth } from "../../context/AuthContext";

import { SearchBar } from "./SearchBar";

import { AccountDropDown } from "./AccountDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Navbar } from "./Navbar";
export function Header() {
  const { cartQuantity } = useShoppingCart();
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return (
    //mb-3 bg-white px-md-5 //
    <Container fluid className="bg-white p-0 sticky-top mb-2">
      <NavbarBs expand sticky="top" className="">
        <Container fluid className="d-flex justify-content-between">
          <Navbar />
          <Container fluid className="bg-white p-0">
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
