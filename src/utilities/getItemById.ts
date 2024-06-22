import storeItems from "../data/items.json";
import type { StoreItemProps } from "../types";
export const getItemById = (
  id: number,
  items: StoreItemProps[] = storeItems
): StoreItemProps | null => {
  if (!id) return null;
  return items.find((item) => item.id === id) || null;
};

/*
export const getItemById = (id: number): StoreItemProps | null => {
  if (!id) return null;
  return storeItems.find((item) => item.id === id) || null;
};

*/
