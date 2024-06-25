import { Row, Col } from "react-bootstrap";
import { useOutletContext, Outlet } from "react-router-dom";
import { OutletContextType } from "../routing/ProtectedRoute";
import { useTransactions } from "../../hooks/useTransactions";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll";
import { useTheme } from "../../context/ThemeContext";
const limit = 2;
export const TransactionsListSidePanel = () => {
  const queryRef = useOutletContext<OutletContextType>();
  const { transactions } = useTransactions(queryRef.reference, limit);
  const { theme } = useTheme();
  return (
    <Row className="h-100" style={{ padding: 0, margin: 0 }}>
      <Col
        className={`shadow-lg sticky-top ${
          theme === "dark" ? "bg-midnight" : "bg-white "
        }`}
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
