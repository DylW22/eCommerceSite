//import { Container, ListGroup, Row, Col } from "react-bootstrap";
//import { Link, Outlet } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { TransactionsLoaderObject } from "../types";
import { GET_TRANSACTIONS } from "../queries";
import { createQueryPreloader, useReadQuery } from "@apollo/client";
import { ListGroup, Col, Row, Container } from "react-bootstrap";

import client from "../apolloClient";
//import { Suspense } from "react";

const preloadQuery = createQueryPreloader(client);

export const HistoryLayout = () => {
  const { data: queryRef } = useLoaderData() as any; // as CountryLoaderObject; //as PastOrderCard[];
  const queryData = useReadQuery(queryRef);
  const { data: transactions } = queryData as any;
  const { getTransactions } = transactions;

  //const { orderDate, orderItem, items: listItems } = getTransactions;
  // let listItems = [{ "0": [] }];
  //console.log("Data: ", getTransactions[0].items);
  console.log("getTransactions: ", getTransactions);
  return (
    <Container fluid className="shadow-lg" style={{ padding: 0, margin: 0 }}>
      <Row style={{ height: "600px" }} className="">
        <Col className="shadow-lg h-100 bg-white" xs={2} md={2} lg={2}>
          <ListGroup defaultActiveKey={``} className="">
            <div>Transactions</div>
            {getTransactions.length > 0 &&
              getTransactions.map((transaction, index) => (
                <ListGroup.Item
                  key={transaction.orderId}
                  action
                  state={transaction}
                  to={`/history/${transaction.orderId}`}
                  as={Link}
                  href={`${index}`}
                  className="text-center"
                >
                  {transaction.orderDate}
                  <span className="d-none d-lg-inline">
                    , orderId: {transaction.orderId}
                  </span>
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
  async ({}): Promise<TransactionsLoaderObject> => {
    let items: any = [];
    try {
      // let codes = ["US", "MX", "CA"];
      items = preloadQuery(GET_TRANSACTIONS); ///*, { variables: { codes } }*/);
      console.log("items: ", items);
      return { data: items };
    } catch (error: any) {
      console.log("Error: ", error);
      throw new Error("NO DATA");
    }
  };
