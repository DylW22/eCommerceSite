import { Button, Col, Container, Row } from "react-bootstrap";
import { Suspense } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import SidePanel from "./SidePanel";
import { SkeletonList } from "./SidePanelList";
import { OutletContextType } from "../routing/ProtectedRoute";
import { TransactionCardSkeleton } from "./TransactionCard";

const TransactionLayout: React.FC = () => {
  const queryRef = useOutletContext<OutletContextType>();

  return (
    <Container
      className="m-0 py-0 px-2 flex-grow-1 d-flex flex-column h-100 overflow-hidden" //To remove 'overflow-hidden
      fluid
    >
      <Row className="m-0 p-0 w-100 h-100 d-flex flex-row flex-grow-1">
        <Col
          className="m-0 p-0 d-none d-sm-block bg-white rounded-2 my-1"
          sm={4}
          md={3}
        >
          <Suspense fallback={<SkeletonList />}>
            <SidePanel />
          </Suspense>
        </Col>

        <Col xs={12} sm={8} md={9} className="m-0 p-0 d-flex flex-column">
          <Row className="m-0 p-0 px-1">
            <Suspense fallback={<TransactionCardSkeletonComplete />}>
              <Outlet context={{ reference: queryRef.reference }} />
            </Suspense>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionLayout;

export const TransactionCardSkeletonComplete: React.FC = () => {
  return (
    <Container className="h-100 m-0 p-0 d-flex flex-column">
      {[0, 1].map((number) => (
        <div className="m-0 p-0 my-1 flex-grow-1" key={number}>
          <TransactionCardSkeleton />
        </div>
      ))}
      <Row
        className="p-0 m-0 d-flex justify-content-center"
        style={{ height: "50px" }}
      >
        <Col xs={4} className="p-0 m-0 mx-2">
          <Button className="w-100 mx-2 p-2" disabled={true}>
            {"<"}
          </Button>
        </Col>
        <Col xs={4} className="p-0 m-0 mx-2">
          <Button className="w-100 mx-2 p-2" disabled={true}>
            {">"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
