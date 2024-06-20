import { useLoaderData, Outlet, LoaderFunction } from "react-router-dom";
import { TransactionsLoaderObject, Transaction } from "../../types";
import { GET_TRANSACTIONS } from "../../queries";
import { createQueryPreloader, useReadQuery } from "@apollo/client";
import { Col, Row, Container } from "react-bootstrap";
//import { measureExecutionTime } from "../../utilities/measureExecutionTime";
//import { PreloadQueryFunction } from "@apollo/client";
import client from "../../apolloClient";
import { DisplayTransactionsList } from "./DisplayTransactionsList";
import { useRef } from "react";
const preloadQuery = createQueryPreloader(client);

interface QueryDataType {
  getTransactions: Transaction[];
  // Add other properties if needed
}

export const TransactionLayout = () => {
  const { data: queryRef } = useLoaderData() as any; //TransactionsLoaderObject; //useLoaderData<TransactionsLoaderObject>();
  const queryData = useReadQuery<QueryDataType>(queryRef);
  const transactions = queryData?.data?.getTransactions || [];

  //https://github.com/apollographql/apollo-client-nextjs/blob/e7a59cb26716a77bbfac659f435f89f5af8eff61/packages/client-react-streaming/src/registerApolloClient.tsx#L152

  const childRefs = useRef<HTMLInputElement[]>([]);
  const scrollDown = (index: number) => {
    if (childRefs.current[index]) {
      childRefs.current[index].style.scrollMargin = "50px";
      childRefs.current[index].scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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
            top: "56px",
            padding: "0",
            height: "calc(100vh - 64px)",
          }}
          xs={3}
          md={3}
          lg={3}
        >
          <DisplayTransactionsList
            transactions={transactions}
            scrollDown={scrollDown}
          />
        </Col>
        {
          <Col xs={9} md={9} lg={9}>
            <Outlet context={childRefs} />
          </Col>
        }
      </Row>
    </Container>
  );
};

export const loader: LoaderFunction = async ({}): Promise<
  TransactionsLoaderObject | undefined
> => {
  try {
    // let codes = ["US", "MX", "CA"];
    // await new Promise((res) => setTimeout(() => res("OK"), 1000));
    const transactions = preloadQuery(GET_TRANSACTIONS) as any; //, { variables: { codes } });

    /*const [transactions, _] = (await measureExecutionTime(() =>
      preloadQuery(GET_TRANSACTIONS)
    )) as any;*/

    return { data: transactions };
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
