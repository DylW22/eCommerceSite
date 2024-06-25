//import { QueryRef } from "@apollo/client";
import { useOutletContext } from "react-router-dom";
//import { OrderData } from "../types";
import TransactionListFinal from "./TransactionListFinal";
import { useTransactions } from "../hooks/useTransactions";
import { OutletContextType } from "../components/routing/ProtectedRoute";
//const preloadQuery = createQueryPreloader(client);

//type QueryRefType = QueryRef<GetTransactionsResponse>;
/*interface GetTransactionsResponse {
  getTransactions: OrderData[];
}*/
//type LoaderFunction = () => Promise<QueryRefType>;
const limit = 2;

export function TestPage4() {
  //<OutletContextType>();
  const queryRef = useOutletContext<OutletContextType>();
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
