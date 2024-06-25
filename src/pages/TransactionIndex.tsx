import { useOutletContext } from "react-router-dom";
import { OrderData } from "../types";
import TransactionListFinal from "./TransactionListFinal";
import { useTransactions } from "../hooks/useTransactions";
import { ListGroup } from "react-bootstrap";
import TransactionCard from "../components/orderHistory/TransactionCard";
import { OutletContextType } from "../components/routing/ProtectedRoute";
//const preloadQuery = createQueryPreloader(client);

//type QueryRefType = QueryRef<GetTransactionsResponse>;
export interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
//type LoaderFunction = () => Promise<QueryRefType>;
const limit = 2;

export function TransactionIndex() {
  const queryRef = useOutletContext<OutletContextType>();
  if (!queryRef) {
    return (
      <>
        <button disabled={true}>Prev</button>
        <button disabled={true}>Next</button>
        {/*     <Suspense fallback={<div>Loading list</div>}> */}
        <ListGroup className="h-100">
          {[0, 1].map((item) => (
            <ListGroup.Item key={item} className="h-100">
              <TransactionCard loading={true} />
            </ListGroup.Item>
          ))}
        </ListGroup>
        {/*      </Suspense> */}
      </>
    );
  }

  console.log("TransactionIndex: ", queryRef.reference);

  //console.log("queryRef: ", queryRef);
  const { transactions, fetchTransactions, hasMorePosts } = useTransactions(
    queryRef.reference,
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
