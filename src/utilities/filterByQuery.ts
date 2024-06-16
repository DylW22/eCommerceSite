import storeItems from "../data/items.json";
export const filterByQuery = (searchTerm: string) => {
  if (!searchTerm) return storeItems;
  const lowercasedSearchTerm = searchTerm.toLowerCase();
  const foundItems = storeItems.filter(
    (item) =>
      item.category.toLowerCase().includes(lowercasedSearchTerm) ||
      item.name.toLowerCase().startsWith(lowercasedSearchTerm)
  );
  return foundItems;
};
