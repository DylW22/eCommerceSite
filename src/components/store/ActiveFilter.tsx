import React from "react";
import { AllowedQueries } from "../../context/FilterQueryContext";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

interface ActiveFilterProps {
  activeFilter: AllowedQueries;
}

const ActiveFilter: React.FC<ActiveFilterProps> = ({ activeFilter }) => {
  const { toggleFilter } = useQueryFilterContext();
  return (
    <div
      style={{ minWidth: "120px" }}
      className="mx-2 p-2 d-flex justify-content-between rounded-3 filter-item"
    >
      <div>{activeFilter}</div>
      <div
        className="px-2 rounded-2"
        onClick={() => toggleFilter(activeFilter)}
      >
        X
      </div>
    </div>
  );
};

export default ActiveFilter;
