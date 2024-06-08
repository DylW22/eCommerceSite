import { Container, Row, Col } from "react-bootstrap";
import { OrderedItemsList } from "./OrderedItemsList";
import { getItemById } from "../utilities/getItemById";
import { PastOrderCard } from "../types";
import React from "react";

type PastOrderProps = {
  order: PastOrderCard;
};

export const PastOrder: React.FC<PastOrderProps> = ({ order }) => {
  const { orderId, orderDate, items } = order;
  const totalPrice = items.reduce((total, item) => {
    const foundItem = getItemById(item.id);
    if (!foundItem) return total;

    return total + foundItem.price * item.quantity;
  }, 0);
  return (
    <Container className="shadow-lg" style={{ height: "300px" }}>
      <Row style={{ backgroundColor: "yellow" }} className="fs-2 p-2">
        <Col className="text-center">Order ID: {orderId}</Col>
        <Col className="text-center">Date: {orderDate}</Col>
      </Row>
      <Row className="fs-1">
        <Col className="text-center fw-bold">Item</Col>
        <Col className="text-center fw-bold">Quantity</Col>
        <Col className="text-center fw-bold">Cost ($)</Col>
      </Row>
      <OrderedItemsList items={items} />

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
  );
};
