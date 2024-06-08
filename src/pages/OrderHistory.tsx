import pastOrders from "../data/pastOrders.json";
import { useLoaderData } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import { PastOrder } from "../components/PastOrder";
import type { PastOrderCard } from "../types";
export function OrderHistory() {
  const data = useLoaderData() as PastOrderCard[];
  console.log("data", data);
  return (
    <>
      {data.length > 0 &&
        data.map((order, index) => <PastOrder key={index} order={order} />)}
    </>
  );
}

export const loader: LoaderFunction = ({ params }): PastOrderCard[] => {
  //get orders from firebase
  //get past data

  return pastOrders as PastOrderCard[];
};
