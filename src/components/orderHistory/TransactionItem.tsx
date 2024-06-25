import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { TransactionProps } from "../../types";
import { TransactionItemsList } from "./TransactionItemsList";
import { calculateTotalPrice } from "../../utilities/calculateTotalPrice";
const TransactionItem: React.FC<TransactionProps> = ({ transaction }) => {
  const { orderId, orderDate, items } = transaction;
  const transactionListItems = Object.values(items);
  const totalPrice = calculateTotalPrice(transactionListItems);

  return (
    <Container fluid className="shadow-lg ">
      <Row style={{ backgroundColor: "yellow" }} className="fs-2 p-2">
        <Col className="text-center">Order ID: {orderId}</Col>
        <Col className="text-center">Date: {orderDate}</Col>
      </Row>
      <Container className="">
        <Row className="fs-1">
          <Col className="text-center fw-bold">Item</Col>
          <Col className="text-center fw-bold">Quantity</Col>
          <Col className="text-center fw-bold">Cost ($)</Col>
        </Row>
        <TransactionItemsList items={transactionListItems} />

        <Row className="mt-5 text-end py-5">
          <Col sm={4} />
          <Col sm={4} className="fs-2">
            Total price:
          </Col>
          <Col sm={4} className="fs-2 fw-bold text-end ">
            ${totalPrice.toFixed(2)}
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TransactionItem;
