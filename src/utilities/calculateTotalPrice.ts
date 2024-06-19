import { transactionItem } from "../types";
import { getItemById } from "./getItemById";
export const calculateTotalPrice = (items: transactionItem[]) => {
  return items.reduce((total, item) => {
    const foundItem = getItemById(item.id);
    if (!foundItem) return total;

    return total + foundItem.price * item.quantity;
  }, 0);
};
