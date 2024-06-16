import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { filterByQuery } from "../utilities/filterByQuery.ts";
import { useRouteLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
type locationObject = {
  q: string;
};

export function Store() {
  const location = useRouteLoaderData("root") as locationObject;
  const itemsToDisplay = filterByQuery(location.q);
  return (
    <Container fluid style={{ margin: "0px" }}>
      <Row md={2} xs={1} lg={3} className="g-3">
        {itemsToDisplay.length ? (
          itemsToDisplay.map((item) => (
            <Col key={item.id} className="">
              <StoreItem {...item} />
            </Col>
          ))
        ) : (
          <div>No items to display</div>
        )}
      </Row>
    </Container>
  );
}
