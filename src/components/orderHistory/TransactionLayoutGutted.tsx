//import React from "react";
import {
  useLoaderData,
  Outlet,
  LoaderFunction,
  useOutletContext,
} from "react-router-dom";
import { TransactionsLoaderObject, OrderData } from "../../types";
import { GET_TRANSACTIONS } from "../../queries";
import { QueryRef, createQueryPreloader, useReadQuery } from "@apollo/client";
import client from "../../apolloClient";
import { Col, Row, Container } from "react-bootstrap";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll";
import { useRef } from "react";
const preloadQuery = createQueryPreloader(client);
import { useTransactions } from "../../hooks/useTransactions";
import { GetTransactionsResponse } from "../../pages/NewHistoryIndex.tsx";
//console.log("preloadQuery: ", preloadQuery);
interface QueryDataType {
  getTransactions: OrderData[];
  // Add other properties if needed
}

const limit = 2;
export const TransactionLayoutGutted = () => {
  const queryRef = useOutletContext<QueryRef<GetTransactionsResponse>>();
  const { transactions, fetchTransactions, hasMorePosts } = useTransactions(
    queryRef,
    limit
  );
  //const { data: queryRef } = useLoaderData() as any; //TransactionsLoaderObject; //useLoaderData<TransactionsLoaderObject>();
  //const queryData = useReadQuery<QueryDataType>(queryRef);
  //console.log("queryRef: ", queryData);
  //const transactions = queryData?.data?.getTransactions || [];

  //https://github.com/apollographql/apollo-client-nextjs/blob/e7a59cb26716a77bbfac659f435f89f5af8eff61/packages/client-react-streaming/src/registerApolloClient.tsx#L152

  /*  const childRefs = useRef<HTMLElement[]>([]);
  const scrollDown = (index: number) => {
    if (childRefs.current[index]) {
      //let offset = index == 2 ? "50px" : "70px";
      childRefs.current[index].style.scrollMargin = "70px";
      childRefs.current[index].scrollIntoView({
        behavior: "smooth",
      });
    }
  };*/

  return (
    <Container
      fluid
      className="shadow-lg h-100"
      style={{ padding: 0, margin: 0, bottom: "" }}
    >
      <Row className="h-100" style={{ padding: 0, margin: 0 }}>
        <Col
          className="shadow-lg bg-white sticky-top "
          style={{
            top: "72px",
            padding: "0",
            margin: "0",
            height: "calc(100vh - 72px)",
          }}
          xs={3}
          md={3}
          lg={3}
        >
          <DisplayTransactionsList
            transactions={transactions}
            //    scrollDown={scrollDown}
          />
        </Col>
        {
          <Col xs={9} md={9} lg={9}>
            <Outlet context={queryRef} /*context={childRefs}*/ />
          </Col>
        }
      </Row>
    </Container>
  );
};
export const loader: LoaderFunction = (): Promise<
  TransactionsLoaderObject | undefined
> => {
  return new Promise((resolve, reject) => {
    try {
      const transactions = preloadQuery(GET_TRANSACTIONS) as any; //, { variables: { codes } });
      console.log("transactions: ", transactions);

      resolve({ data: transactions }); // fetchMore
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Failed to load data: ", error.message);
        reject(error.message);
      } else {
        console.log(
          "An unknown error occurred when trying to load data: ",
          error
        );
        reject("An unknown error occurred");
      }
    }
  });
};

/*
export const loader: LoaderFunction = async (): Promise<
  TransactionsLoaderObject | undefined
> => {
  try {
    const transactions = preloadQuery(GET_TRANSACTIONS) as any; //, { variables: { codes } });
    console.log("transactions: ", transactions);

    return { data: transactions }; //fetchMore
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Failed to load data: ", error.message);
    } else {
      console.log(
        "An unknown error occurred when trying to load data: ",
        error
      );
    }
    //  console.log("Error: ", error);
    // throw new Error("NO DATA");
  }
};
*/

// export const loader: LoaderFunction = async ({}): Promise<
//   TransactionsLoaderObject | undefined
// > => {
//   //  let transactions: any = [];
//   try {
//     // let codes = ["US", "MX", "CA"];
//     const transactions = preloadQuery(GET_TRANSACTIONS); //, { variables: { codes } });
//     //console.log("Get transactions: ");
//     //items = await measureExecutionTime(() => preloadQuery(GET_TRANSACTIONS));
//     console.log("items: ", transactions);
//     return { data: transactions };
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log("Failed to load data: ", error.message);
//     } else {
//       console.log(
//         "An unknown error occurred when trying to load data: ",
//         error
//       );
//     }
//     //  console.log("Error: ", error);
//     // throw new Error("NO DATA");
//   }
// };
