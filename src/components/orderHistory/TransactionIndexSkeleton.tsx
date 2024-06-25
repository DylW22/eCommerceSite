import { ListGroup } from "react-bootstrap";
import TransactionCard from "./TransactionCard";
export const TransactionIndexSkeleton = () => {
  return (
    <>
      <button disabled={true}>Prev</button>
      <button disabled={true}>Next</button>
      <ListGroup className="h-100">
        {[0, 1].map((item) => (
          <ListGroup.Item key={item} className="h-100">
            <TransactionCard loading={true} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};
