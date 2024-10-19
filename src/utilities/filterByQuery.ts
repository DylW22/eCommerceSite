import { StoreItemProps } from "../types";
export const filterByQuery = (
  searchTerm: string,
  items: StoreItemProps[]
): StoreItemProps[] => {
  if (!searchTerm) return items;
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  const foundItems = items.filter(
    (item) =>
      item.category?.toLowerCase().includes(lowercasedSearchTerm) ||
      item.name.toLowerCase().startsWith(lowercasedSearchTerm)
  );
  return foundItems;
};
