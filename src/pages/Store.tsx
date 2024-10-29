import { Row, Col } from "react-bootstrap";
// import { useRouteLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { locationObject } from "../types.ts";
import "./../assets/styles/styles.css";
// import { useDynamicBackground } from "../hooks/useDynamicBackground.tsx";

import FilterDropDown from "../components/store/FilterDropDown.tsx";
import ActiveFilters from "../components/store/ActiveFilters.tsx";
import { ProductList } from "../components/store/ProductList.tsx";
import { useQueryFilterContext } from "../context/FilterQueryContext.tsx";

export function Store() {
  // const { styles } = useDynamicBackground("linear", 50);

  const { toggleFilter, clearFilter } = useQueryFilterContext();

  return (
    <div className="overflow-hidden">
      <Container fluid className="d-none d-sm-block mx-3">
        <Row>
          <Col className="m-0 p-0 mt-1">
            <FilterDropDown
              toggleFilter={toggleFilter}
              clearFilter={clearFilter}
            />
          </Col>
          <Col className="m-0 p-0 d-flex mx-4 justify-content-end py-2">
            <ActiveFilters />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className="m-0 py-2 d-flex flex-column justify-content-center"
      >
        <Container className="p-0 m-0 mt-2 mx-auto">
          <ProductList />
        </Container>
      </Container>
    </div>
  );
}
