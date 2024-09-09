import { useOutletContext } from "react-router-dom";
import { OrderData } from "../../types";

import { useTransactions } from "../../hooks/useTransactions";
import { OutletContextType } from "../routing/ProtectedRoute";
import TransactionListContent from "./TransactionListContent";
import { TransactionListSkeleton } from "./TransactionListSkeleton";

export interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
const limit = 2;

export interface ExtendedOutletContextType extends OutletContextType {
  transactionsTest: [];
}

export function TransactionIndex() {
  const queryRef = useOutletContext<ExtendedOutletContextType>();
  if (!queryRef) {
    return <TransactionListSkeleton />;
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
