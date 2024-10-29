import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { CartItemsProps } from "../../types";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

export function CartItem({ id, quantity, checkout }: CartItemsProps) {
  const { removeFromCart } = useShoppingCart();
  const { products: items } = useQueryFilterContext();
  const cartItem = items.find((i) => i.id === id);
  if (!cartItem) return null;
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={`d-flex align-items-center`}
    >
      <img
        src={cartItem.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className={checkout ? "fw-bold" : ""}>
          {cartItem.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".75rem" }}>
          {formatCurrency(cartItem.price)}
        </div>
      </div>
      <div className={`${checkout ? "fw-bold" : ""}`}>
        {formatCurrency(cartItem.price * quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(cartItem.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
