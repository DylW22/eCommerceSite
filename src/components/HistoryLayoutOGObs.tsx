import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
//import { PastOrderCard } from "../types";
import { fetchOrderHistory } from "../utilities/fetchOrderHistory";
import { useLoaderData } from "react-router-dom";
import { HistoryLoaderObject } from "../types";

export const HistoryLayout = () => {
  const loadedData = useLoaderData() as HistoryLoaderObject; //as PastOrderCard[];
  const { data: listItems } = loadedData;

  return (
    <Container fluid className="shadow-lg" style={{ padding: 0, margin: 0 }}>
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
          <ListGroup defaultActiveKey={``} className="px-2">
            <div>Transactions</div>
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
        {
          <Col xs={10} md={10} lg={10}>
            <Outlet />
          </Col>
        }
      </Row>
    </Container>
  );
};

export const loader: LoaderFunction =
  async ({}): Promise<HistoryLoaderObject> => {
    //get orders from firebase
    //get past data
    let status: "success" | "failure" = "success";
    let errors: Record<string, string> = {};
    let orders = [];
    try {
      orders = await fetchOrderHistory();
      status = "success";

      return { data: orders, status, errors };
    } catch (error: any) {
      status = "failure";
      errors[error.code] = error.message;
    }
    return { data: orders, status, errors };
    // return pastOrders as PastOrderCard[];
  };

/*
 return (
    <Container fluid className="shadow-lg" style={{ padding: 0, margin: 0 }}>
      <Row style={{ margin: 0 }}>Hello</Row>
    </Container>
  );

  */
