import { useShoppingCart } from "../context/ShoppingCartContext";
import { DisplayCartItems } from "../components/cart/containers/DisplayCartItems.tsx";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

//Auth state persistence
//https://stackoverflow.com/questions/71718724/react-context-data-is-empty-after-routed-to-next-page
export function Checkout() {
  const { cartQuantity } = useShoppingCart();
  const location = useLocation();
  if (!cartQuantity) return <div>Cart is empty!</div>;

  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 72px)",
      }}
      className="m-0 p-4"
    >
      <DisplayCartItems checkout={location.pathname === "/checkout"} />
    </Container>
  );
}
