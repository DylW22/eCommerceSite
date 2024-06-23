import { useRouteLoaderData, useOutletContext } from "react-router-dom";
import { OrderData, ChildRefs } from "../types";
import { useReadQuery } from "@apollo/client";
import { ListGroup } from "react-bootstrap";
//import TransactionItem from "../components/orderHistory/TransactionItem";
import TransactionCard from "../components/orderHistory/TransactionCard";
interface QueryDataType {
  getTransactions: OrderData[];
  // Add other properties if needed
}

export const HistoryIndex = () => {
  const { data: queryRef } = useRouteLoaderData("history") as any;

  const queryData = useReadQuery<QueryDataType>(queryRef);
  const transactions = queryData?.data?.getTransactions || [];

  const childRefs = useOutletContext() as ChildRefs;
  const currentTransactions = transactions.slice(0, 2);
  return (
    <ListGroup className="h-100">
      {currentTransactions &&
        currentTransactions.map((transaction, index) => (
          <ListGroup.Item
            ref={(el: HTMLAnchorElement) => (childRefs.current[index] = el)}
            key={transaction.orderId}
            id={`${transaction.orderId}`}
            className="h-100"
          >
            <TransactionCard transaction={transaction} />
            {/*<TransactionItem transaction={transaction} />*/}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
