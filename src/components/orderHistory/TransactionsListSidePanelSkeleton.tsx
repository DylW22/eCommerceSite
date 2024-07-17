import { Row, Col, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { DisplayTransactionsList } from "./DisplayTransactionsListNoScroll";
import { useDynamicBackground } from "../../hooks/useDynamicBackground";

export const TransactionsListSidePanelSkeleton: React.FC = () => {
  const { styles } = useDynamicBackground();
  return (
    <Row className="h-100" style={{ padding: 0, margin: 0 }}>
      <Col
        className={`shadow-lg sticky-top rounded-2`}
        style={{
          background: styles,
          top: "72px",
          padding: "0",
          margin: "0",
          height: "calc(100vh - 100px)",
        }}
        xs={3}
        md={3}
        lg={3}
      >
        <Row className="p-0 m-0 w-100">
          <DisplayTransactionsList loading={true} />
        </Row>
        <Row className="d-flex flex-row p-0 m-0 justify-content-center">
          <Button className="w-25 mx-2" disabled={true}>
            {"<"}
          </Button>
          <Button className="w-25 mx-2" disabled={true}>
            {">"}
          </Button>
        </Row>
      </Col>
      <Col xs={9} md={9} lg={9}>
        <Outlet />
      </Col>
    </Row>
  );
};
