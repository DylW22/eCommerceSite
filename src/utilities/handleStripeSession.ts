import { TransactionsData } from "./../types";
import React from "react";

const handleStripeSession = async (
  createCheckoutSession: any,
  orderData: TransactionsData
) => {
  const { items } = orderData;
  try {
    const { data } = createCheckoutSession({ variables: { items } });
    window.location.href = data.createCheckoutSession.url; //perform session redirect here..
  } catch (err) {
    console.error("Error creating checkout session", err);
  }
};

export default handleStripeSession;
