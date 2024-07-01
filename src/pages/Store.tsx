import { Row, Col } from "react-bootstrap";
import { StoreItem } from "../components/cart/containers/StoreItem.tsx";
import { filterByQuery } from "../utilities/filterByQuery.ts";
import { useRouteLoaderData } from "react-router-dom";
import { Container } from "react-bootstrap";
//import { GET_DATA, GetDataQuery } from "../queries.ts";
//import { useQuery, createQueryPreloader, useReadQuery } from "@apollo/client";
//import client from "../apolloClient.ts";
import { locationObject } from "../types.ts";
import "./../assets/styles/styles.css";
import { useDynamicBackground } from "../hooks/useDynamicBackground.tsx";
//import { useTheme } from "../context/ThemeContext.tsx";
//const preloadQuery = createQueryPreloader(client);
//const preloadedQueryRef = preloadQuery(GET_DATA);

export function Store() {
  const location = useRouteLoaderData("root") as locationObject;
  const itemsToDisplay = filterByQuery(location.q);
  const { styles } = useDynamicBackground("linear", 50);

  return (
    <Container
      fluid
      style={{
        //   height: "calc(100vh - 80px)",
        background: `${styles}`,
        height: "100%",
        // height: "calc(100vh - 72px)",
        // background: `linear-gradient(to right, ${styles})`,
      }}
      className="m-0 p-4 d-flex justify-content-center"
    >
      <Container style={{ margin: "0px" }} className="p-0 m-0 mt-2">
        <Row md={2} xs={1} lg={3} className="g-4 g-md-3">
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
    </Container>
  );
}
