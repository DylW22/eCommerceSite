import React from "react";
import { AllowedQueries } from "../../types";
import { useQueryFilterContext } from "../../context/FilterQueryContext";

interface ActiveFilterProps {
  activeFilter: AllowedQueries;
}

const ActiveFilter: React.FC<ActiveFilterProps> = ({ activeFilter }) => {
  const { toggleFilter } = useQueryFilterContext();
  return (
    <div
      style={{ minWidth: "120px" }}
      className="mx-2 p-2 d-flex justify-content-between rounded-3 filter-item fw-bold"
    >
      <div>{activeFilter}</div>
      <div
        className="px-2 fw-bold"
        role="button"
        onClick={() => toggleFilter(activeFilter)}
        aria-label={`Remove ${activeFilter} filter`}
        style={{ cursor: "pointer" }}
      >
        X
      </div>
    </div>
  );
};

export default ActiveFilter;
