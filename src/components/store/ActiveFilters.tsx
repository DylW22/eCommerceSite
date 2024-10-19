import React from "react";
import ActiveFilter from "./ActiveFilter";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

const ActiveFilters: React.FC = () => {
  const { activeFilters } = useQueryFilterContext();
  return (
    <>
      {activeFilters.map((activeFilter) => (
        <ActiveFilter key={activeFilter} activeFilter={activeFilter} />
      ))}
    </>
  );
};

export default ActiveFilters;
