import React, { useMemo } from "react";
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
        style={{ minHeight: "calc(50vh - 56px)" }}
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

  /*const totalPrice = useMemo(
    () => calculateTotalPrice(transactionListItems),
    [transactionListItems]
  );*/
  const totalPrice =
    Math.round(100 * calculateTotalPrice(transactionListItems)) / 100;
  return (
    <Container
      fluid
      className="shadow-lg d-flex flex-column h-100 p-0 m-0"
      style={{ minHeight: "calc(50vh - 56px)" }}
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
    <Row className="d-flex flex-row justify-items-between bg-light px-2 py-4   m-0">
      <Col>
        <CardTitle className="card-title">Order ID #{orderId}</CardTitle>
      </Col>
      <Col className="text-end">
        <CardTitle className="card-title ">Order date: {orderDate}</CardTitle>
      </Col>
      <CardText className="text-muted d-none d-md-block px-4">
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
      <Col
        sm={2}
        md={3}
        className="d-none d-md-flex flex-column h-100 justify-content-center align-items-center"
      >
        Col 1
      </Col>
      <Col className="d-none d-md-flex flex-column mx-2">
        <CardTitle>Purchased items</CardTitle>
        {items && <TransactionItemsList items={items} />}
      </Col>
      <Col className="d-flex flex-column justify-content-between">
        <Row className="p-0 m-0 d-flex align-items-center justify-content-center">
          <Row className="d-flex align-items-center justify-content-center">
            Delivered: 12-12-2024
          </Row>
          <Row className="d-flex align-items-center justify-content-center">
            Row 2
          </Row>
        </Row>
        <Row className="p-0 m-0 d-block text-end p-2">
          Total price: <span className="fw-bold fs-4">${totalPrice}</span>
        </Row>
      </Col>
    </Row>
  );
};
export default TransactionCard;
