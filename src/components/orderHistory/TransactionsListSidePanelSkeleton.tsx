import { Row, Col, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll";
import { useTheme } from "../../context/ThemeContext";
export const TransactionsListSidePanelSkeleton = () => {
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
        <Row className="p-0 m-0 w-100">
          <DisplayTransactionsList
            loading={true}
            //    scrollDown={scrollDown}
          />
        </Row>
        <Row className="d-flex flex-row p-0 m-0 justify-content-center">
          <Button className="w-25 mx-2" disabled={true}>
            Next
          </Button>
          <Button className="w-25 mx-2" disabled={true}>
            Prev
          </Button>
        </Row>
      </Col>
      <Col xs={9} md={9} lg={9}>
        <Outlet />
      </Col>
    </Row>
  );
};
