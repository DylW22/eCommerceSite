import { useRouteLoaderData } from "react-router-dom";
import { Transaction } from "../types";
import { useReadQuery } from "@apollo/client";
import { useRef, useEffect } from "react";
//import { Container } from "react-bootstrap";
import { ListGroup, Button } from "react-bootstrap";
//import { PastOrder } from "../components/orderHistory/PastOrder";
import TransactionItem from "../components/orderHistory/TransactionItem";
import { useSmoothScrollContext } from "../context/SmoothScrollContext";
interface QueryDataType {
  getTransactions: Transaction[];
  // Add other properties if needed
}

export const HistoryIndex = () => {
  const { data: queryRef } = useRouteLoaderData("history") as any;
  const queryData = useReadQuery<QueryDataType>(queryRef);
  const transactions = queryData?.data?.getTransactions || [];
  const { cardRefs, scrollToNextCard, scrollToCard } = useSmoothScrollContext();

  return (
    <ListGroup className="">
      <Button onClick={() => scrollToCard(2)}>Hello</Button>
      {transactions &&
        transactions.map((transaction, index) => (
          <ListGroup.Item
            ref={(el) => (cardRefs.current[index] = el)}
            key={transaction.orderId}
            id={`${transaction.orderId}`}
          >
            <TransactionItem transaction={transaction} />
            <Button onClick={() => scrollToNextCard(index)}>Next</Button>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
