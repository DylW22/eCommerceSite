import { Row, Col, Button } from "react-bootstrap";
import { useOutletContext, Outlet } from "react-router-dom";
import { OutletContextType } from "../routing/ProtectedRoute";
import { useTransactions } from "../../hooks/useTransactions";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll";
import { useDynamicBackground } from "../../hooks/useDynamicBackground";
import React from "react";
const limit = 2;
export const TransactionsListSidePanel: React.FC<{ loading: boolean }> = ({
  loading,
}) => {
  const queryRef = useOutletContext<OutletContextType>();
  const { styles } = useDynamicBackground();
  const { transactions } = useTransactions(queryRef.reference, limit);

  return (
    <Row className="h-100" style={{ padding: 0, margin: 0 }}>
      <Col
        className={`shadow-lg sticky-top rounded-2`}
        style={{
          background: styles,
          top: "72px",
          padding: "0",
          margin: "0",
          height: "calc(100vh - 72px)", //- 100px
        }}
        xs={3}
        md={3}
        lg={3}
      >
        <Row className="p-0 m-0 w-100">
          <DisplayTransactionsList
            transactions={transactions}
            loading={loading}
          />
        </Row>
        <Row className="d-flex flex-row p-0 m-0 justify-content-center align-items-center">
          <Button className="w-25 mx-2">{"<"}</Button>
          <Button className="w-25 mx-2">{">"}</Button>
        </Row>
      </Col>
      {
        <Col xs={9} md={9} lg={9}>
          <Outlet
            context={{
              reference: queryRef.reference,
              //   transactionsTest: sampleTransactions,
            }}
          />
        </Col>
      }
    </Row>
  );
};

/* const sampleTransactions = [
  {
    items: [
      {
        quantity: 11,
        id: 1,
      },
    ],
    orderDate: "June 26, 2024",
    orderId: 3,
  },
  {
    items: [
      {
        quantity: 6,
        id: 2,
      },
    ],
    orderDate: "June 26, 2024",
    orderId: 18,
  },
]; */
