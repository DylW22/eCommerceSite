import { Button, Row, Form } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { generateOrderDetails } from "../utilities/generateOrderDetails";
import {
  Form as FormRR,
  Navigate,
  redirect,
  useActionData,
} from "react-router-dom";
import { writeToDatabase } from "../utilities/writeTransactions.js";
import { useEffect, useState } from "react";

//import { useState, useEffect } from "react";
export function Payment() {
  const { cartItems } = useShoppingCart();

  //generateOrderDetails(cartItems);
  const cartItemsJSON = JSON.stringify(cartItems);
  return (
    <div>
      <Row>Hello</Row>

      <Form as={FormRR} method="post">
        <Form.Control name="cartItems" readOnly hidden value={cartItemsJSON} />
        <Button type="submit">CONFIRM</Button>
      </Form>
    </div>
  );
}

export const action =
  (appContext) =>
  async ({ request }) => {
    //Perform payment action
    //Successful?
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const cartItemsParsed = JSON.parse(data.cartItems);
    const order = generateOrderDetails(cartItemsParsed);

    try {
      await writeToDatabase(order);
    } catch (error) {
      console.log("An error occurred");
    }
    //Write to database

    return "ABC"; //<Navigate to="/" state={} />; //redirect("/");
  };
