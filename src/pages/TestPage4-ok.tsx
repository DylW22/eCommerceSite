import {
  useReadQuery,
  createQueryPreloader,
  QueryRef,
  useQueryRefHandlers,
  useBackgroundQuery,
  useQuery,
} from "@apollo/client";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Suspense, useEffect, useState, useTransition } from "react";
import { GET_TRANSACTIONS } from "../queries";
import client from "../apolloClient";
//import { Container } from "react-bootstrap";
import { OrderData } from "../types";
import TransactionCard from "../components/orderHistory/TransactionCard";
import { ListGroup } from "react-bootstrap";
const preloadQuery = createQueryPreloader(client);
//const preloadedQueryRef = preloadQuery(GET_TRANSACTIONS);

type QueryRefType = QueryRef<GetTransactionsResponse>;
interface GetTransactionsResponse {
  getTransactions: OrderData[];
}
type LoaderFunction = () => Promise<QueryRefType>;

export function TestPage4() {
  const [transactions, setTransactions] = useState<OrderData[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<
    OrderData[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isPending, startTransition] = useTransition();
  const limit = 2;
  const queryRef = useOutletContext();

  const { data } = useReadQuery<GetTransactionsResponse>(queryRef);
  const { fetchMore } = useQueryRefHandlers(queryRef);
  //console.log("data: ", data); data doesn't get updated for useReadQuery ??
  //Get initial transactions
  useEffect(() => {
    if (data && data.getTransactions) {
      setTransactions(data?.getTransactions);
    }
  }, []); //data?.getTransactions

  const updateDisplayedTransactions = () => {
    const newDisplayedTransactions = transactions.slice(
      currentIndex,
      currentIndex + limit
    );
    setDisplayedTransactions(newDisplayedTransactions);
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await fetchMore({
        variables: {
          offset: transactions.length,
          limit: limit,
        },
      });

      const { getTransactions } = data;

      if (getTransactions.length < 1) {
        setHasMorePosts(false);
      }
      setTransactions((prev) => [...prev, ...getTransactions]);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleNextClick = () => {
    startTransition(() => {
      const newIndex = currentIndex + limit;
      console.log("newIndex: ", newIndex);
      if (newIndex >= transactions.length - 2 * limit && hasMorePosts) {
        console.log("Fetching more");
        fetchTransactions();
      }
      setCurrentIndex(newIndex);
    });
  };
  const handlePrevClick = () => {
    startTransition(() => {
      const newIndex = Math.max(currentIndex - limit, 0);
      setHasMorePosts(true);
      setCurrentIndex(newIndex);
    });
  };

  useEffect(() => {
    updateDisplayedTransactions();
  }, [transactions, currentIndex]);
  return (
    <>
      <button
        onClick={handlePrevClick}
        disabled={isPending || currentIndex < limit}
      >
        Prev
      </button>
      <button onClick={handleNextClick} disabled={isPending || !hasMorePosts}>
        Next
      </button>
      <ListGroup className="h-100">
        {displayedTransactions &&
          displayedTransactions.map((transaction, index) => (
            <ListGroup.Item
              //ref={(el: HTMLAnchorElement) => (childRefs.current[index] = el)}
              key={transaction.orderId}
              id={`${transaction.orderId}`}
              className="h-100"
            >
              <TransactionCard transaction={transaction} />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  );
}
