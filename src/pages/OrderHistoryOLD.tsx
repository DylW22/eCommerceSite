import pastOrders from "../data/pastOrders.json";
import { useLoaderData } from "react-router-dom";
import type { LoaderFunction } from "react-router-dom";
import { PastOrder } from "../components/PastOrder";
import type { PastOrderCard } from "../types";
import { fetchOrderHistory } from "../utilities/fetchOrderHistory";

export function OrderHistory() {
  const data = useLoaderData() as PastOrderCard[];

  return (
    <>
      {Object.values(data).length > 0 &&
        Object.values(data).map((order, index) => (
          <PastOrder key={index} order={order} />
        ))}
    </>
  );
}

export const loader: LoaderFunction = async (): Promise<PastOrderCard[]> => {
  //get orders from firebase
  //get past data

  let errors: Record<string, string> = {};
  let status: "success" | "failure" = "success";
  try {
    const orders = await fetchOrderHistory();
    console.log("orders: ", orders);
    status = "success";
    return orders;
  } catch (error: any) {
    status = "failure";
    errors[error.code] = error.message;
  }

  return {
    status,
    errors,
  }; //pastOrders as PastOrderCard[];
};
