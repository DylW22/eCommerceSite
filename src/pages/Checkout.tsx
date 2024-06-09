import { useShoppingCart } from "../context/ShoppingCartContext";
import { DisplayCartItems } from "../components/DisplayCartItems.tsx";

//Auth state persistence
//https://stackoverflow.com/questions/71718724/react-context-data-is-empty-after-routed-to-next-page
export function Checkout() {
  const { cartQuantity } = useShoppingCart();

  if (!cartQuantity) return <div>Cart is empty!</div>;

  return (
    <>
      <DisplayCartItems />
    </>
  );
}
