//import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll.tsx";
import { Suspense } from "react";
//const preloadQuery = createQueryPreloader(client);
import { useTransactions } from "../../hooks/useTransactions.tsx";

import { OutletContextType } from "../routing/ProtectedRoute.tsx";

const limit = 2;
const TransactionFrameTestElement = () => {
  const queryRef = useOutletContext<OutletContextType>();
  const { transactions } = useTransactions(queryRef.reference, limit);

  return (
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
          loading={false}
          //    scrollDown={scrollDown}
        />
      </Col>
      {
        <Col xs={9} md={9} lg={9}>
          <Outlet
            context={{ reference: queryRef.reference }} /*context={childRefs}*/
          />
        </Col>
      }
    </Row>
  );
};

const Skeleton = () => {
  // const queryRef = useOutletContext<QueryRef<GetTransactionsResponse>>();
  //const { transactions } = useTransactions(queryRef, limit);

  return (
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
          //  transactions={transactions}
          loading={true}
          //    scrollDown={scrollDown}
        />
      </Col>
      <Col xs={9} md={9} lg={9}>
        <Outlet />
        {/*         <Outlet
          context={{ reference: queryRef.reference }}
        /> */}
      </Col>
    </Row>
  );
};

export const TransactionLayout = () => {
  /*  const queryRef = useOutletContext<QueryRef<GetTransactionsResponse>>();
  const { transactions, fetchTransactions, hasMorePosts } = useTransactions(
    queryRef,
    limit
  );*/
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
      <Suspense fallback={<Skeleton />}>
        <TransactionFrameTestElement />
      </Suspense>
    </Container>
  );
};
