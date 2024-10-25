import React, { createContext, useContext, useEffect, useState } from "react";
import { StoreItemProps } from "../types";

import { useLocation, useNavigate } from "react-router-dom";
import { filterByQuery } from "../utilities/filterByQuery";
import useProductsFetch from "../hooks/useProducts";

import { FilterQueryContextType } from "../types";
import { AllowedQueries } from "../types";
const allowedQueries = ["book", "electronics", "food"];

const FilterQueryContext = createContext<FilterQueryContextType | undefined>(
  undefined
);

const FilterQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [filteredItems, setFilteredItems] = useState<StoreItemProps[]>([]);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<AllowedQueries[]>([]);

  const { products, loading, error } = useProductsFetch();

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
        ? products.filter((item) =>
            filters.includes(item.category as AllowedQueries)
          )
        : filterByQuery(query, products)
    );
  }, [location.search, query, products]);

  return (
    <FilterQueryContext.Provider
      value={{
        filteredItems,
        setFilteredItems,
        clearFilter,
        toggleFilter,
        activeFilters,
        query,
        setQuery,
        products,
        loading,
        error,
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
