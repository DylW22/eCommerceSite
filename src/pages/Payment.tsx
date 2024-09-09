import { Button, Row, Form, Container, Col } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { generateOrderDetails } from "../utilities/generateOrderDetails";
import { Form as FormRR, Navigate, useActionData } from "react-router-dom";
import { writeToDatabase } from "../utilities/writeTransactions"; //.js

import type { ActionFunction } from "react-router-dom";
import type { ActionRequestProps } from "../types.js";

import { useState } from "react";
import { useFadeout } from "../hooks/useFadeout.js";
import PaymentSuccess from "../components/payment/PaymentSuccess.js";

type PaymentFormData = {
  name: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

const initialFormData: PaymentFormData = {
  name: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

export function Payment() {
  const data = useActionData() as any;
  const status = data?.status;
  const { toFade, applyFade } = useFadeout(3000);
  const { cartItems } = useShoppingCart();
  const cartItemsJSON = JSON.stringify(cartItems);

  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  console.log("status: ", data);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    applyFade();
  };

  return (
    <Container className="fluid" style={{ height: "calc(100vh - 72px)" }}>
      {status === "success" && (
        <Navigate to="/success" state={{ from: "/payment" }} />
      )}

      <Form
        as={FormRR}
        method="post"
        state={{ from: "/payment" }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Cardholder Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Control name="cartItems" readOnly hidden value={cartItemsJSON} />
        <Button type="submit">Submit Payment</Button>
      </Form>
      <div>
        This is a not real payment submission platform. Please only use fake
        payment information.
      </div>
      <div>{toFade && <PaymentSuccess />}</div>
    </Container>
  );
}

export const action: ActionFunction =
  () =>
  async ({ request }: ActionRequestProps): Promise<PaymentDetails | any> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;

    const cartItemsParsed = JSON.parse(data.cartItems);

    const order = generateOrderDetails(cartItemsParsed);
    console.log("action");
    const errors: Record<string, string> = {};
    let status: "success" | "failure" = "success";
    try {
      //Perform payment action
      //Successful?

      await writeToDatabase(order);
      status = "success";
    } catch (error: unknown) {
      status = "failure";
      if (error instanceof Error) {
        console.error("An error occurred: ", error.message);
      } else {
        console.error("An unknown error occurred: ", error);
      }

      // const errorCode = error.code;
      // const errorMessage = error.message;
      // errors[errorCode] = errorMessage;
    }
    return {
      status,
      errors,
    };
  };

type PaymentDetails = {
  status: "success" | "failure";
  errors: Record<string, string>;
};
