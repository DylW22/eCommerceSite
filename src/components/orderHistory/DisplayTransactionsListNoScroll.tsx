import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderData } from "../../types";
import { TransactionSidePanelContainerContent } from "./TransactionSidePanelContainerContent";
import { TransactionSidePanelContainerSkeleton } from "./TransactionSidePanelContainerSkeleton";

interface DisplayTransactionsListProps {
  transactions?: OrderData[];
  loading: boolean;
  //  scrollDown: (index: number) => void;
}

export const DisplayTransactionsList: React.FC<
  DisplayTransactionsListProps
> = ({ transactions, loading /* scrollDown*/ }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    //  scrollDown(index);
    setActiveIndex(index);
  };

  return (
    <>
      <h1 className="text-center pt-2 fs-4 font-weight-bold rounded-md">
        Transactions
      </h1>
      <ListGroup defaultActiveKey={``} className="h-100 p-2">
        {loading ? (
          <TransactionSidePanelContainerSkeleton />
        ) : (
          <TransactionSidePanelContainerContent
            transactions={transactions}
            activeIndex={activeIndex}
            handleItemClick={handleItemClick}
          />
        )}
      </ListGroup>
    </>
  );
};

/* interface TransactionSidePanelContainerContentProps {
  transactions: OrderData[] | undefined;
  handleItemClick: (index: number) => void;
  activeIndex: number | null;
}

export const TransactionSidePanelContainerContent: React.FC<
  TransactionSidePanelContainerContentProps
> = ({ transactions, handleItemClick, activeIndex }) => {
  return (
    ((transactions && transactions?.length) ?? 0) > 0 &&
    (transactions || []).map((transaction, index) => (
      <ListGroup.Item
        onClick={() => handleItemClick(index)}
        key={transaction.orderId}
        action
        active={activeIndex === index}
        className="text-center"
      >
        {transaction.orderDate}
        <span className="d-none d-lg-inline">
          , orderId: {transaction.orderId}
        </span>
      </ListGroup.Item>
    ))
  );
};
 */
