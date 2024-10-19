import { Dropdown } from "react-bootstrap";
import { AllowedQueries } from "../../context/FilterQueryContext";

interface FilterDropDownProps {
  toggleFilter: (filterValue: AllowedQueries) => void;
  clearFilter: () => void;
}
const FilterDropDown: React.FC<FilterDropDownProps> = ({
  toggleFilter,
  clearFilter,
}: FilterDropDownProps) => {
  return (
    <Dropdown className="p-0 mb-1">
      <Dropdown.Toggle variant="primary" className="">
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu className="p-0 m-0">
        <Dropdown.Item onClick={clearFilter}>Clear</Dropdown.Item>
        <Dropdown.Item onClick={() => toggleFilter("book")}>
          Books
        </Dropdown.Item>
        <Dropdown.Item onClick={() => toggleFilter("electronics")}>
          Electronics
        </Dropdown.Item>
        <Dropdown.Item onClick={() => toggleFilter("food")}>Food</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropDown;
