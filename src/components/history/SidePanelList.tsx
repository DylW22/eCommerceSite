import React, { useState } from "react";
import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import { TransactionsData } from "../../types";

type SidePanelListProps = {
  transactions: TransactionsData[];
};

const SidePanelList: React.FC<SidePanelListProps> = ({ transactions }) => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const handleItemClick = (newIndex: number) => {
    setActiveIndex(newIndex);
  };

  return (
    <Container className="m-0 p-0 text-center pt-2 fs-4 font-weight-bold rounded px-2 h-100">
      <h1>Transactions</h1>
      {transactions && transactions.length > 0 && (
        <ListGroup className="m-0 p-0">
          {transactions.map((transaction, index) => (
            <ListGroupItem
              onClick={() => handleItemClick(index)}
              active={activeIndex === index}
              key={transaction.orderId}
            >
              <TransactionListItem orderId={transaction.orderId} />
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export const SkeletonList: React.FC = () => {
  const skeletonItems: number[] = [0, 1];
  return (
    <Container className="m-0 p-0 text-center pt-2 fs-4 font-weight-bold rounded-md px-2">
      <h1>Transactions</h1>
      <ListGroup className="m-0 p-0">
        {skeletonItems.map((number) => (
          <ListGroupItem key={number}>
            <TransactionListItemSkeleton />
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

type TransactionListItem = Pick<TransactionsData, "orderId">;

const TransactionListItemSkeleton: React.FC = () => {
  return <div className="w-100">&nbsp;</div>;
};

const TransactionListItem: React.FC<TransactionListItem> = ({ orderId }) => {
  return <>{orderId}</>;
};

export default SidePanelList;
