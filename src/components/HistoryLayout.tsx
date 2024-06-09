import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { PastOrderCard } from "../types";
import { fetchOrderHistory } from "../utilities/fetchOrderHistory";
import { useLoaderData } from "react-router-dom";
export const HistoryLayout = () => {
  const listItems = useLoaderData() as PastOrderCard[];

  return (
    <Container>
      <Row style={{ height: "400px" }}>
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

export const loader: LoaderFunction = async ({}): Promise<PastOrderCard[]> => {
  //get orders from firebase
  //get past data
  let status: "success" | "failure" = "success";
  let errors: Record<string, string> = {};
  try {
    const orders = await fetchOrderHistory();
    status = "success";

    return orders;
  } catch (error: any) {
    status = "failure";
    errors[error.code] = error.message;
  }
  return [];
  // return pastOrders as PastOrderCard[];
};
