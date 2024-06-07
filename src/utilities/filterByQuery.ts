import storeItems from "../data/items.json";
export const filterByQuery = (searchTerm: string) => {
  if (!searchTerm) return storeItems;
  return storeItems.filter((item) => item.name.includes(searchTerm)) || null;
};
