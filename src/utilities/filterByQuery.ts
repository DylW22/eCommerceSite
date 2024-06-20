import storeItems from "../data/items.json";
import { StoreItemProps } from "../types";
export const filterByQuery = (searchTerm: string): StoreItemProps[] => {
  if (!searchTerm) return storeItems;
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  const foundItems = storeItems.filter(
    (item) =>
      item.category.toLowerCase().includes(lowercasedSearchTerm) ||
      item.name.toLowerCase().startsWith(lowercasedSearchTerm)
  );
  return foundItems;
};
