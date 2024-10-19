import { Row, Col } from "react-bootstrap";
// import { useRouteLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
// import { locationObject } from "../types.ts";
import "./../assets/styles/styles.css";
import { useDynamicBackground } from "../hooks/useDynamicBackground.tsx";

import FilterDropDown from "../components/store/FilterDropDown.tsx";
import ActiveFilters from "../components/store/ActiveFilters.tsx";
import { ProductList } from "../components/store/ProductList.tsx";
import { useQueryFilterContext } from "../context/FilterQueryContext.tsx";

export function Store() {
  const { styles } = useDynamicBackground("linear", 50);

  const { toggleFilter, clearFilter } = useQueryFilterContext();

  return (
    <>
      <Container fluid className="d-none d-sm-block px-5">
        <Row>
          <Col className="m-0 p-0">
            <FilterDropDown
              toggleFilter={toggleFilter}
              clearFilter={clearFilter}
            />
          </Col>
          <Col className="m-0 p-0 d-flex justify-content-end">
            <ActiveFilters />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        style={{
          //   height: "calc(100vh - 80px)",
          background: `${styles}`,

          // height: location.q ? "calc(100vh - 72px)" : "100%",
        }}
        className="m-0 p-4 d-flex flex-column justify-content-center"
      >
        <Container className="p-0 m-0 mt-2 mx-auto">
          <ProductList />
        </Container>
      </Container>
    </>
  );
}
