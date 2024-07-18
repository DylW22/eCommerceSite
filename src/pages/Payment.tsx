import { Button, Row, Form } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { generateOrderDetails } from "../utilities/generateOrderDetails";
import { Form as FormRR, Navigate, useActionData } from "react-router-dom";
import { writeToDatabase } from "../utilities/writeTransactions"; //.js

import type { ActionFunction } from "react-router-dom";
import type { ActionRequestProps } from "../types.js";
//import { ADD_TRANSACTION } from "../queries.js";
//import { useMutation } from "@apollo/client";
//import { useEffect } from "react";
export function Payment() {
  const data = useActionData() as any;
  const status = data?.status;
  const { cartItems } = useShoppingCart();
  const cartItemsJSON = JSON.stringify(cartItems);

  return (
    <div>
      <Row>Hello</Row>
      {status === "success" && (
        <Navigate to="/success" state={{ from: "/payment" }} />
      )}

      <Form as={FormRR} method="post" state={{ from: "/payment" }}>
        <Form.Control name="cartItems" readOnly hidden value={cartItemsJSON} />
        <Button type="submit">CONFIRM</Button>
      </Form>
    </div>
  );
}

export const action: ActionFunction =
  () =>
  async ({ request }: ActionRequestProps): Promise<PaymentDetails | any> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;

    const cartItemsParsed = JSON.parse(data.cartItems);

    const order = generateOrderDetails(cartItemsParsed);

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
