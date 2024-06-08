import storeItems from "../data/items.json";
import type { Item } from "../types";
export const getItemById = (id: number): Item | null => {
  if (!id) return null;
  return storeItems.find((item) => item.id === id) || null;
};
