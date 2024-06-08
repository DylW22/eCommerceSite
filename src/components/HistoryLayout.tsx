import React from "react";
import { Container, ListGroup, Stack, Row, Col } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { PastOrderCard } from "../types";
import { fetchOrderHistory } from "../utilities/fetchOrderHistory";
import { useLoaderData } from "react-router-dom";
export const HistoryLayout = () => {
  const listItems = useLoaderData() as PastOrderCard[];
  const location = useLocation();
  console.log("location: ", location);

  return (
    <Container>
      <Row style={{ height: "300px" }}>
        <Col
          className="shadow-lg"
          xs={2}
          md={2}
          lg={2}
          style={{
            backgroundColor: "white",
          }}
        >
          <ListGroup defaultActiveKey={``} className="p-2">
            {Object.values(listItems).length > 0 &&
              Object.values(listItems).map((item, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  state={item}
                  href={`${index}`}
                  to={`/history/${item.orderId}`}
                  as={Link}
                >
                  {item.orderId}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col xs={10} md={10} lg={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<PastOrderCard[]> => {
  //get orders from firebase
  //get past data
  try {
    const orders = await fetchOrderHistory();
    console.log("orders: ", orders);
    return orders;
  } catch (error) {
    console.log("Could not load transaction history.");
  }
  return [];
  // return pastOrders as PastOrderCard[];
};
