import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { filterByQuery } from "../utilities/filterByQuery.ts";
import { useRouteLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
import { GET_DATA, GetDataQuery } from "../queries.ts";
import { useQuery, createQueryPreloader, useReadQuery } from "@apollo/client";
import client from "../apolloClient.ts";
import "./../assets/styles/styles.css";
type locationObject = {
  q: string;
};

//const preloadQuery = createQueryPreloader(client);
//const preloadedQueryRef = preloadQuery(GET_DATA);

export function Store() {
  const location = useRouteLoaderData("root") as locationObject;
  const itemsToDisplay = filterByQuery(location.q);
  console.log("itemsToDisplay: ", itemsToDisplay);
  //const { data } = useReadQuery(preloadedQueryRef);
  //console.log("Preread data: ", data);
  /*  const { loading, error, data } = useQuery<GetDataQuery>(GET_DATA);

  if (loading) {
    console.log("Loading: ", loading);
  }
  if (data) {
    console.log("Data: ", data);
  } */

  return (
    <Container className="">
      <Container style={{ margin: "0px" }} className="p-0 m-0 mt-2">
        <Row md={2} xs={1} lg={3} className="g-3">
          {itemsToDisplay.length ? (
            itemsToDisplay.map((item) => (
              <Col key={item.id} className="w-50">
                <StoreItem {...item} />
              </Col>
            ))
          ) : (
            <div>No items to display</div>
          )}
        </Row>
      </Container>
    </Container>
  );
}
