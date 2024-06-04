import {
  Col,
  Row,
  Container,
  Nav,
  Navbar as NavbarBs,
  Dropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavbarCartButton } from "./NavbarCartButton";
import { useAuth } from "../context/AuthContext";
import { Account } from "../pages/Account";
export function Navbar() {
  const { cartQuantity } = useShoppingCart();
  const { state } = useAuth();
  const { isAuthenticated } = state;
  console.log(isAuthenticated);
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3 ">
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
        </Nav>{" "}
        <Container className="d-flex justify-content-end align-items-center">
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
                  <Dropdown.Item>
                    <Nav.Link to="/account" as={NavLink}>
                      Profile
                    </Nav.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link to="/login" as={NavLink}>
                Login
              </Nav.Link>
            )}
          </Container>

          {cartQuantity > 0 && <NavbarCartButton />}
        </Container>
      </Container>
    </NavbarBs>
  );
}
