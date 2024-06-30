import { Row, Col, Button } from "react-bootstrap";
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

  let sampleTransactions = [
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
  ];

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
          height: "calc(100vh - 72px)", //- 100px
        }}
        xs={3}
        md={3}
        lg={3}
      >
        {/*         <DisplayTransactionsList
          transactions={transactions}
          loading={false}
          //    scrollDown={scrollDown}
        /> */}

        <Row className="p-0 m-0 w-100">
          <DisplayTransactionsList
            transactions={transactions}
            loading={false}
            //    scrollDown={scrollDown}
          />
        </Row>
        <Row className="d-flex flex-row p-0 m-0 justify-content-center">
          <Button className="w-25 mx-2">Next</Button>
          <Button className="w-25 mx-2">Prev</Button>
        </Row>
      </Col>
      {
        <Col xs={9} md={9} lg={9}>
          <Outlet
            context={{
              reference: queryRef.reference,
              transactionsTest: sampleTransactions,
            }} /*context={childRefs}*/
          />
        </Col>
      }
    </Row>
  );
};
