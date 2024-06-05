import { Stack, Button, Nav } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export function DisplayCartItems() {
  const { cartItems, closeCart } = useShoppingCart();
  const location = useLocation();

  console.log("location: ", location.pathname);
  return (
    <Stack gap={3}>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="ms-auto fw-bold fs-5">
        Total{" "}
        {formatCurrency(
          cartItems.reduce((total, cartItem) => {
            const item = storeItems.find((i) => i.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0)
        )}
      </div>
      {/*Need to determine how to redirect to /checkout if shopping cart is clicked and already on /checkout */}
      {location.pathname === "/checkout" ? (
        <Nav.Link to="/payment" as={NavLink}>
          Payment
        </Nav.Link>
      ) : (
        <Button onClick={closeCart}>
          <Nav.Link to="/checkout" as={NavLink}>
            Checkout
          </Nav.Link>
        </Button>
      )}
      {}
    </Stack>
  );
}
