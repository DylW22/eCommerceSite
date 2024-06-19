import { getCurrentDateBasedOnLocale } from "./getCurrentDate";
//import { CartItem } from "../context/ShoppingCartContext";
import { CartItem } from "../types";
export const generateOrderDetails = (cartItems: CartItem[]) => {
  const items = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));
  return {
    orderDate: getCurrentDateBasedOnLocale("en-US"),
    orderId: Math.round(Math.random() * 100),
    items,
  };
};
