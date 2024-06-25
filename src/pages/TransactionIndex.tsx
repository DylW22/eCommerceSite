import { useOutletContext } from "react-router-dom";
import { OrderData } from "../types";

import { useTransactions } from "../hooks/useTransactions";
import { OutletContextType } from "../components/routing/ProtectedRoute";
import TransactionListContent from "./TransactionListContent";
import { TransactionIndexSkeleton } from "../components/orderHistory/TransactionIndexSkeleton";

export interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
const limit = 2;

export function TransactionIndex() {
  const queryRef = useOutletContext<OutletContextType>();
  if (!queryRef) {
    return <TransactionIndexSkeleton />;
  }

  const { transactions, fetchTransactions, hasMorePosts } = useTransactions(
    queryRef.reference,
    limit
  );

  return (
    <TransactionListContent
      transactions={transactions}
      fetchTransactions={fetchTransactions}
      hasMorePosts={hasMorePosts}
      limit={limit}
    />
  );
}
