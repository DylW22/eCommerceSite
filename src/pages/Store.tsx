import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { filterByQuery } from "../utilities/filterByQuery.ts";
import { useRouteLoaderData } from "react-router-dom";

export function Store() {
  const location = useRouteLoaderData("root");
  const itemsToDisplay = filterByQuery(location.q);
  return (
    <>
      <div>Store</div>
      {/*<SearchBar />*/}
      <Row md={2} xs={1} lg={3} className="g-3">
        {itemsToDisplay.length ? (
          itemsToDisplay.map((item) => (
            <Col key={item.id}>
              <StoreItem {...item} />
            </Col>
          ))
        ) : (
          <div>No items to display</div>
        )}
      </Row>
    </>
  );
}
