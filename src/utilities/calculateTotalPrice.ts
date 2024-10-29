import { TransactionItem } from "../types";
import { getItemById } from "./getItemById";
export const calculateTotalPrice = (items: TransactionItem[]): number => {
  return items.reduce((total, item) => {
    const foundItem = getItemById(item.id); //28.10
    if (!foundItem) return total;
    return total + foundItem.price * item.quantity;
  }, 0);
};
