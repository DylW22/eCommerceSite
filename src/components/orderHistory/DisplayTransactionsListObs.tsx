import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderData } from "../../types";

interface DisplayTransactionsListProps {
  transactions: OrderData[];
  scrollDown: (index: number) => void;
}

export const DisplayTransactionsList: React.FC<
  DisplayTransactionsListProps
> = ({ transactions, scrollDown }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    scrollDown(index);
    setActiveIndex(index);
  };
  return (
    <>
      <h1 className="text-center pt-2 fs-4 font-weight-bold rounded-md">
        Transactions
      </h1>
      <ListGroup defaultActiveKey={``} className="h-100 p-2">
        {transactions.length > 0 &&
          transactions.map((transaction, index) => (
            <ListGroup.Item
              onClick={() => handleItemClick(index)}
              key={transaction.orderId}
              action
              active={activeIndex === index}
              //  to={`/history`}
              //  as={Link}
              //  state={{ transactionId: transaction.orderId }}
              // to={`/history/${transaction.orderId}`}
              //   href={`${index}`}
              className="text-center"
            >
              {transaction.orderDate}
              <span className="d-none d-lg-inline">
                , orderId: {transaction.orderId}
              </span>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
};
