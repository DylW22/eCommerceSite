import React from "react";
import {
  Col,
  Row,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap";
import { OrderData, TransactionItem, TransactionProps } from "../../types";
import { calculateTotalPrice } from "../../utilities/calculateTotalPrice";
import { TransactionItemsList } from "./TransactionItemsList";
const TransactionCard: React.FC<TransactionProps> = ({
  transaction,
  loading,
}) => {
  if (loading) {
    return (
      <Container
        fluid
        className="shadow-lg d-flex flex-column h-100 p-0 m-0"
        style={{ minHeight: "calc(50vh - 80px)" }}
      >
        <Card className="flex-grow-1 d-flex flex-column h-100 flex-fill  p-0 m-0">
          <CardBody className="d-flex flex-column p-0 m-0">
            <HeaderSection orderId={"X"} orderDate={"Xxxx YY Zzzz"} />
            <BodySection totalPrice={"XX.XX"} />
          </CardBody>
        </Card>
      </Container>
    );
  }

  const { orderId, orderDate, items } = transaction as OrderData;
  const transactionListItems = Object.values(items);

  const totalPrice =
    Math.round(100 * calculateTotalPrice(transactionListItems)) / 100;
  return (
    <Container
      fluid
      className="shadow-lg d-flex flex-column h-100 p-0 m-0"
      style={{ minHeight: "calc(50vh - 80px)" }}
    >
      <Card className="flex-grow-1 d-flex flex-column h-100 flex-fill  p-0 m-0">
        <CardBody className="d-flex flex-column p-0 m-0">
          <HeaderSection orderId={orderId} orderDate={orderDate} />
          <BodySection totalPrice={totalPrice} items={transactionListItems} />
        </CardBody>
      </Card>
    </Container>
  );
};

//HeaderSection
const HeaderSection: React.FC<{
  orderId: string | number;
  orderDate: string;
}> = ({ orderId, orderDate }) => {
  return (
    <Row className="d-flex flex-column flex-md-row justify-items-between bg-light py-4 m-0">
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

//BodySection
const BodySection: React.FC<{
  totalPrice: string | number;
  items?: TransactionItem[];
}> = ({ totalPrice, items }) => {
  return (
    <Row className="h-100 py-2">
      <Col className="d-none d-md-flex flex-column mx-5">
        <CardTitle>Purchased items</CardTitle>
        {items && <TransactionItemsList items={items} />}
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
