import { Row, Col } from "react-bootstrap";
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
          height: "calc(100vh - 80px)", //- 100px
        }}
      >
        <Row className="p-0 d-none d-md-block m-0 w-100">
          <DisplayTransactionsList
            transactions={transactions}
            loading={loading}
          />
        </Row>
      </Col>
      {
        <Col xs={12} md={9} lg={9}>
          <Outlet
            context={{
              reference: queryRef.reference,
            }}
          />
        </Col>
      }
    </Row>
  );
};
