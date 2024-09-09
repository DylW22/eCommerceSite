import { Button, ListGroup, Row } from "react-bootstrap";
import TransactionCard from "./TransactionCard";
export const TransactionListSkeleton = () => {
  return (
    <>
      <ListGroup className="">
        {[0, 1].map((item) => (
          <ListGroup.Item key={item} className="">
            <TransactionCard loading={true} />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row className="d-flex flex-row p-0 mt-2 justify-content-center align-items-center">
        <Button className="w-25 mx-2" disabled={true}>
          {"<"}
        </Button>
        <Button className="w-25 mx-2" disabled={true}>
          {">"}
        </Button>
      </Row>
    </>
  );
};
