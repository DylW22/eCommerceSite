import { LoaderFunction } from "react-router-dom";
import { useLoaderData, Link, Outlet } from "react-router-dom";
import { TransactionsLoaderObject, Transaction } from "../types";
import { GET_TRANSACTIONS } from "../queries";
import { createQueryPreloader, useReadQuery } from "@apollo/client";
import { ListGroup, Col, Row, Container } from "react-bootstrap";
//import { PreloadQueryFunction } from "@apollo/client";
import client from "../apolloClient";
//import { measureExecutionTime } from "../utilities/measureExecutionTime";
//import { Suspense } from "react";

const preloadQuery = createQueryPreloader(client);

interface QueryDataType {
  getTransactions: Transaction[];
  // Add other properties if needed
}

export const HistoryLayout = () => {
  const { data: queryRef } = useLoaderData() as any; //TransactionsLoaderObject; //useLoaderData<TransactionsLoaderObject>();
  //const { data: queryRef } = useLoaderData() as any; // as CountryLoaderObject; //as PastOrderCard[];
  const queryData = useReadQuery<QueryDataType>(queryRef);
  const transactions = queryData?.data?.getTransactions || [];
  //https://github.com/apollographql/apollo-client-nextjs/blob/e7a59cb26716a77bbfac659f435f89f5af8eff61/packages/client-react-streaming/src/registerApolloClient.tsx#L152

  return (
    <Container fluid className="shadow-lg" style={{ padding: 0, margin: 0 }}>
      <Row style={{ height: "600px" }} className="">
        <Col className="shadow-lg h-100 bg-white" xs={2} md={2} lg={2}>
          <ListGroup defaultActiveKey={``} className="">
            <div>Transactions</div>
            {transactions.length > 0 &&
              transactions.map((transaction, index) => (
                <ListGroup.Item
                  key={transaction.orderId}
                  action
                  state={transaction}
                  to={`/history/${transaction.orderId}`}
                  as={Link}
                  href={`${index}`}
                  className="text-center"
                >
                  {transaction.orderDate}
                  <span className="d-none d-lg-inline">
                    , orderId: {transaction.orderId}
                  </span>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        {
          <Col xs={10} md={10} lg={10}>
            <Outlet />
          </Col>
        }
      </Row>
    </Container>
  );
};

export const loader: LoaderFunction = async ({}): Promise<
  TransactionsLoaderObject | undefined
> => {
  //  let transactions: any = [];
  try {
    // let codes = ["US", "MX", "CA"];
    const transactions = preloadQuery(GET_TRANSACTIONS) as any; //, { variables: { codes } });
    //console.log("Get transactions: ");
    //items = await measureExecutionTime(() => preloadQuery(GET_TRANSACTIONS));
    console.log("items: ", transactions);
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
