import { Col, Card } from "react-bootstrap";

const StoreItemSkeleton: React.FC = () => {
  return (
    <Col className="">
      <Card
        className="h-100 w-100 p-2 product-skeleton"
        style={{ height: "380px", minHeight: "390px" }}
      >
        <Card.Img variant="top" height="200px" style={{ objectFit: "cover" }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
            <span className="fs-3">
              <div className="product-skeleton-text"></div>
            </span>
            <span className="ms-2 text-muted">
              <div className="product-skeleton-text"></div>
            </span>
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default StoreItemSkeleton;
