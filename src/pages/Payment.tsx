import { Button, Table, Row, Col } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { generateOrderDetails } from "../utilities/generateOrderDetails";
export function Payment() {
  const { cartItems } = useShoppingCart();

  generateOrderDetails(cartItems);
  return (
    <div>
      <Row>Hello</Row>

      <Button>CONFIRM</Button>
    </div>
  );
}
