import pastOrders from "../data/pastOrders.json";
import { Outlet, useLoaderData } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import { PastOrder } from "../components/PastOrder";
import type { PastOrderCard } from "../types";
import { fetchOrderHistory } from "../utilities/fetchOrderHistory";
import { Col, Stack } from "react-bootstrap";
export function OrderHistory() {
  const data = useLoaderData() as PastOrderCard[];
  console.log("data", data);
  return (
    <>
      {Object.values(data).length > 0 &&
        Object.values(data).map((order, index) => (
          <PastOrder key={index} order={order} />
        ))}
    </>
  );
}

export const loader: LoaderFunction = async ({ params }): PastOrderCard[] => {
  //get orders from firebase
  //get past data
  try {
    const orders = await fetchOrderHistory();
    console.log("orders: ", orders);
    return orders;
  } catch (error) {
    console.log("Could not load transaction history.");
  }

  return pastOrders as PastOrderCard[];
};
