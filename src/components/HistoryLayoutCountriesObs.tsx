//import { Container, ListGroup, Row, Col } from "react-bootstrap";
//import { Link, Outlet } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
//import { PastOrderCard } from "../types";
//import { fetchOrderHistory } from "../utilities/fetchOrderHistory";
import { useLoaderData } from "react-router-dom";
import { CountryLoaderObject } from "../types";
import { GET_COUNTRIES, GET_DATA } from "../queries";
import { createQueryPreloader, useReadQuery } from "@apollo/client";
import client from "../apolloClient";
import { Suspense } from "react";

const preloadQuery = createQueryPreloader(client);

export const HistoryLayout = () => {
  const { data: queryRef } = useLoaderData() as any; // as CountryLoaderObject; //as PastOrderCard[];
  const queryData = useReadQuery(queryRef);
  const { data: countries } = queryData as any;
  console.log("Data: ", countries);

  return (
    <div>
      <Suspense fallback={<div>Loading..</div>}>
        <ul>
          {Object.values(countries).length > 0 &&
            Object.values(countries).map((country: any, index: number) => (
              <li key={index}>{country.name}</li>
            ))}
        </ul>
      </Suspense>
    </div>
  );
};

export const loader: LoaderFunction =
  async ({}): Promise<CountryLoaderObject> => {
    //let status: "success" | "failure" = "success";
    //let errors: Record<string, string> = {};
    //let orders: any = [];
    let countries: any = [];
    try {
      let codes = ["US", "MX", "CA"];
      countries = preloadQuery(GET_COUNTRIES, { variables: { codes } });
      return { data: countries };
    } catch (error: any) {
      throw new Error("NO DATA");
      //  status = "failure";
      //errors[error.code] = error.message;
    }
    //return { data: orders, status, errors };
    // return pastOrders as PastOrderCard[];
  };
