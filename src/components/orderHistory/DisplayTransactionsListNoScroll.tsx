import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { DisplayTransactionsListProps } from "../../types";
import { TransactionSidePanelContainerContent } from "./TransactionSidePanelContainerContent";
import { TransactionSidePanelContainerSkeleton } from "./TransactionSidePanelContainerSkeleton";
//import { useDynamicBackground } from "../../hooks/useDynamicBackground";

export const DisplayTransactionsList: React.FC<
  DisplayTransactionsListProps
> = ({ transactions, loading /* scrollDown*/ }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //const { styles } = useDynamicBackground();
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
