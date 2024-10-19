import React, { createContext, useContext, useEffect, useState } from "react";
import { StoreItemProps } from "../types";

import { useLocation, useNavigate } from "react-router-dom";
import { filterByQuery } from "../utilities/filterByQuery";

const allowedQueries = ["book", "electronics", "food"];
export type AllowedQueries = "food" | "electronics" | "book";
type FilterQueryContextType = {
  filteredItems: StoreItemProps[];
  setFilteredItems: (items: StoreItemProps[]) => void;
  items: StoreItemProps[];
  setItems: (items: StoreItemProps[]) => void;
  toggleFilter: (
    filterValue: StoreItemProps["category"] & AllowedQueries
  ) => void;
  clearFilter: () => void;
  activeFilters: AllowedQueries[];
  query: string;
  setQuery: (item: string) => void;
};

const FilterQueryContext = createContext<FilterQueryContextType | undefined>(
  undefined
);

const FilterQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<StoreItemProps[]>([]);
  const [filteredItems, setFilteredItems] = useState<StoreItemProps[]>([]);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<AllowedQueries[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const clearFilter = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("filter");
    navigate(`?${searchParams.toString()}`);
  };

  const toggleFilter = (filterValue: AllowedQueries) => {
    const searchParams = new URLSearchParams(location.search);

    const filters = searchParams.get("filter")?.split(",") || [];
    let filtersArray: AllowedQueries[] = filters as AllowedQueries[];
    if (filterValue && filtersArray.includes(filterValue)) {
      filtersArray = filtersArray.filter((f) => f !== filterValue);
    } else {
      filtersArray.push(filterValue || "");
    }
    if (filtersArray.length > 0) {
      searchParams.set("filter", filtersArray.join(","));
    } else {
      searchParams.delete("filter");
    }

    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filters = searchParams.get("filter")?.split(",") || [];
    const validFilters = filters.filter((filter): filter is AllowedQueries =>
      allowedQueries.includes(filter as AllowedQueries)
    );

    setActiveFilters(validFilters);
    setFilteredItems(
      validFilters.length > 0
        ? items.filter((item) =>
            filters.includes(item.category as AllowedQueries)
          )
        : filterByQuery(query, items)
    );
  }, [location.search, query, items]);

  return (
    <FilterQueryContext.Provider
      value={{
        items,
        setItems,
        filteredItems,
        setFilteredItems,
        clearFilter,
        toggleFilter,
        activeFilters,
        query,
        setQuery,
      }}
    >
      {children}
    </FilterQueryContext.Provider>
  );
};

const useQueryFilterContext = (): FilterQueryContextType => {
  const context = useContext(FilterQueryContext);
  if (!context) {
    throw new Error(
      "useQueryFilterContext must be used within a QueryFilterContextProvider"
    );
  }
  return context;
};

export { FilterQueryProvider, useQueryFilterContext };
