import { Stack, Button, Nav } from "react-bootstrap";

import { CartItem } from "../CartItem";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import CartItemSkeletonList from "./CartItemSkeletonList";
import { useQueryFilterContext } from "../../../context/FilterQueryContext";

interface DisplayCartItemsProps {
  checkout: boolean;
}
export function DisplayCartItems({ checkout }: DisplayCartItemsProps) {
  const { cartItems, closeCart } = useShoppingCart();
  const { products } = useQueryFilterContext();
  const location = useLocation();

  return (
    <Stack gap={3}>
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem checkout={checkout} key={item.id} {...item} />
          ))
        ) : (
          <CartItemSkeletonList count={3} />
        )}
      </div>
      <div className={"ms-auto fw-bold fs-5"}>
        Total{" "}
        {formatCurrency(
          cartItems.reduce((total, cartItem) => {
            const item = products.find((i) => i.id === cartItem.id);
            return total + (item?.price || 0) * cartItem.quantity;
          }, 0)
        )}
      </div>
      {checkout ? (
        <Button style={{ maxWidth: "200px" }}>
          <Nav.Link
            to="/payment"
            as={NavLink}
            state={{ from: location?.pathname }}
            className="fw-bold"
          >
            Confirm
          </Nav.Link>
        </Button>
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
