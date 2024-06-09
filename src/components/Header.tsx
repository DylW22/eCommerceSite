import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavbarCartButton } from "./NavbarCartButton";
import { useAuth } from "../context/AuthContext";

import { SearchBar } from "./SearchBar";

import { AccountDropDown } from "./AccountDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { Navbar } from "./Navbar";
export function Header() {
  const { cartQuantity } = useShoppingCart();
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return (
    <Container fluid className="bg-white shadow-sm mb-3 p-0 px-md-5">
      <NavbarBs expand sticky="top" className="">
        <Container fluid className="d-flex justify-content-between">
          <Navbar />
          <div className="d-none d-md-flex align-items-center">
            <ThemeToggle />
            <SearchBar />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            {isAuthenticated ? (
              <AccountDropDown />
            ) : (
              <Nav.Link to="/login" as={NavLink}>
                <Button>Login</Button>
              </Nav.Link>
            )}
            {cartQuantity > 0 && <NavbarCartButton />}
          </div>
        </Container>
      </NavbarBs>
    </Container>
  );
}

/*
return (
    <Container fluid className="bg-white shadow-sm mb-3 p-0 px-md-5">
      <NavbarBs expand sticky="top" className="">
        <Container fluid className="d-flex justify-content-between">
          <Navbar />
          <ThemeToggle />
          <SearchBar />
          {isAuthenticated ? (
            <AccountDropDown />
          ) : (
            <Nav.Link to="/login" as={NavLink}>
              <Button>Login</Button>
            </Nav.Link>
          )}
          {cartQuantity > 0 && <NavbarCartButton />}
          {
          <Container
            fluid
            className="d-flex justify-content-end align-items-center"
          >
            <Container
              fluid
              className="d-none d-md-flex justify-content-start align-items-center"
            >
              <ThemeToggle />
              <SearchBar />
            </Container>
            <Container
              fluid
              className="d-flex justify-content-end align-items-center"
              style={{ position: "relative" }}
            >
              {isAuthenticated ? (
                <AccountDropDown />
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
        </Container>
      );
    }
    
*/
