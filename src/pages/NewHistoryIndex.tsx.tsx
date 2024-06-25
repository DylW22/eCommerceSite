import { QueryRef } from "@apollo/client";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { OrderData } from "../types";
import TransactionListFinal from "./TransactionListFinal";
import { useTransactions } from "../hooks/useTransactions";
//const preloadQuery = createQueryPreloader(client);

//type QueryRefType = QueryRef<GetTransactionsResponse>;
export interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
//type LoaderFunction = () => Promise<QueryRefType>;
const limit = 2;

export function NewHistoryIndex() {
  const queryRef = useOutletContext<QueryRef<GetTransactionsResponse>>();
  const { transactions, fetchTransactions, hasMorePosts } = useTransactions(
    queryRef,
    limit
  );

  return (
    <TransactionListFinal
      transactions={transactions}
      fetchTransactions={fetchTransactions}
      hasMorePosts={hasMorePosts}
      limit={limit}
    />
  );
}
