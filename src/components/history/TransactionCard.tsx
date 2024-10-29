import React from "react";
import {
  Col,
  Row,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardHeader,
} from "react-bootstrap";
import {
  TransactionsData,
  TransactionItem,
  TransactionProps,
} from "../../types";
import { calculateTotalPrice } from "../../utilities/calculateTotalPrice";
import { TransactionItemsList } from "./TransactionItemsList";

export const TransactionCardSkeleton: React.FC = () => {
  return (
    <Container fluid className="shadow-lg d-flex flex-column h-100 p-0 m-0">
      <Card className="flex-grow-1 d-flex flex-column h-100 p-0 m-0">
        <CardHeader className="m-0 p-0">
          <HeaderSection orderId={"X"} orderDate={"Xxxx YY Zzzz"} />
        </CardHeader>
        <CardBody className="d-flex flex-column p-0 m-0">
          <BodySection totalPrice={"XX.XX"} />
        </CardBody>
      </Card>
    </Container>
  );
};

const TransactionCard: React.FC<TransactionProps> = ({ transaction }) => {
  const { orderId, orderDate, items } = transaction as TransactionsData;
  const transactionListItems = Object.values(items); //Trace this back to ensure orderId is a string

  const totalPrice =
    Math.round(100 * calculateTotalPrice(transactionListItems)) / 100;
  return (
    <Container fluid className="shadow-lg d-flex flex-column h-100 p-0 m-0">
      <Card className="flex-grow-1 d-flex flex-column h-100 p-0 m-0">
        <CardHeader className="p-0 m-0">
          <HeaderSection orderId={orderId} orderDate={orderDate} />
        </CardHeader>
        <CardBody className="d-flex flex-column p-0 m-0">
          <BodySection totalPrice={totalPrice} items={transactionListItems} />
        </CardBody>
      </Card>
    </Container>
  );
};

const HeaderSection: React.FC<{
  orderId: string;
  orderDate: string;
}> = ({ orderId, orderDate }) => {
  return (
    <Row className="d-flex flex-column flex-md-row justify-items-between py-4 m-0">
      <Col>
        <CardTitle className="card-title text-center">
          Order ID #{orderId}
        </CardTitle>
      </Col>
      <Col className="">
        <CardTitle className="card-title text-center">
          Date: {orderDate}
        </CardTitle>
      </Col>
      <CardText className="text-muted d-none d-md-block px-3 mx-2">
        This is a wider card with supporting text below as a natural lead-in.
      </CardText>
    </Row>
  );
};

const BodySection: React.FC<{
  totalPrice: string | number;
  items?: TransactionItem[];
}> = ({ totalPrice, items }) => {
  return (
    <Row className="h-100 m-0 p-0 py-2">
      <Col
        className="d-none d-md-flex flex-column mx-5"
        style={{ minHeight: "30px" }}
      >
        <CardTitle>Purchased items</CardTitle>
        <Container className="m-0 p-0 flex-grow-1" style={{ height: "100px" }}>
          {items && items.length > 0 ? (
            <TransactionItemsList items={items} />
          ) : (
            <div
              style={{
                width: "100px",
              }}
            >
              <div
                className="rounded-2 mb-1"
                style={{ height: "1em", backgroundColor: "#e0e0e0" }}
              >
                &nbsp;
              </div>
              <div
                className="rounded-2 mb-1"
                style={{ height: "1em", backgroundColor: "#e0e0e0" }}
              >
                &nbsp;
              </div>
            </div>
          )}
        </Container>
      </Col>
      <Col className="d-flex flex-column justify-content-center align-items-left mx-5">
        <Row className="m-0 p-0 text-center">
          <p className="m-0 p-0">
            Delivered: <span className="">TBD</span>
          </p>
        </Row>
        <Row className="m-0 p-0 text-center">
          <p className="m-0 p-0">
            Total price: <span className="fw-bold fs-4">${totalPrice}</span>
          </p>
        </Row>
      </Col>
    </Row>
  );
};
export default TransactionCard;
