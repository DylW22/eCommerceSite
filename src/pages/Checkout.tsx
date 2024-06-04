import { ButtonGroup, Button, Nav, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
//Auth state persistence
//https://stackoverflow.com/questions/71718724/react-context-data-is-empty-after-routed-to-next-page
export function Checkout() {
  const { cartQuantity } = useShoppingCart();
  const { state, login } = useAuth();
  const { isAuthenticated } = state;
  const location = useLocation();

  //Reimplemented

  //Determine if this is necessary
  // <Nav.Link to="/login" as={NavLink} state={{ location }}>
  if (!isAuthenticated) {
    return (
      <Container className="d-flex">
        <Button>
          <Nav.Link to="/login" as={NavLink}>
            Login
          </Nav.Link>
        </Button>
        <Button>
          <Nav.Link to="/register" as={NavLink}>
            Create account
          </Nav.Link>
        </Button>
      </Container>
    );
  }

  if (!cartQuantity) return <div>Cart is empty!</div>;

  return <div>Checkout</div>;
}
