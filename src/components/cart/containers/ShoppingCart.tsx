import { Offcanvas } from "react-bootstrap";
import { useShoppingCart } from "../../../context/ShoppingCartContext.tsx";
import { DisplayCartItems } from "./DisplayCartItems.tsx";
import { ShoppingCartProps } from "../../../types.ts";
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <DisplayCartItems checkout={false} />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
