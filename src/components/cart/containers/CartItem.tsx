import { useShoppingCart } from "../../../context/ShoppingCartContext";
//import storeItems from "../../../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { CartItemsProps } from "../../../types";
import { useQueryFilterContext } from "../../../context/FilterQueryContext";

export function CartItem({ id, quantity, checkout }: CartItemsProps) {
  const { removeFromCart } = useShoppingCart();
  const { items: newItems } = useQueryFilterContext();
  //storeItems
  const item = newItems.find((i) => i.id === id);

  if (!item) return null;
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className={`d-flex align-items-center`}
    >
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div className={checkout ? "fw-bold" : ""}>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div style={{ fontSize: ".75rem" }}>{formatCurrency(item.price)}</div>
      </div>
      <div className={`${checkout ? "fw-bold" : ""}`}>
        {formatCurrency(item.price * quantity)}
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
