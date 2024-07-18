import {
  useState,
  useTransition,
  useEffect,
  Suspense,
  useCallback,
} from "react";
import { Button, ListGroup, NavLink } from "react-bootstrap";
import { OrderData, TransactionListProps } from "../types";
import TransactionCard from "../components/orderHistory/TransactionCard";
import { NavLink as RRNavLink } from "react-router-dom";

function TransactionListContent({
  transactions,
  fetchTransactions,
  hasMorePosts,
  limit,
}: TransactionListProps) {
  const [displayedTransactions, setDisplayedTransactions] = useState<
    OrderData[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  //https://chatgpt.com/c/afc059ac-a349-4c29-980e-15219d71cc75
  const updateDisplayedTransactions = () => {
    const newDisplayedTransactions = transactions.slice(
      currentIndex,
      currentIndex + limit
    );
    setDisplayedTransactions(newDisplayedTransactions);
  };

  //Great use of useCallback
  const handleNextClick = useCallback(() => {
    startTransition(() => {
      const newIndex = currentIndex + limit;
      if (newIndex >= transactions.length - 2 * limit && hasMorePosts) {
        fetchTransactions();
      }
      setCurrentIndex(newIndex);
    });
  }, [
    currentIndex,
    limit,
    transactions.length,
    hasMorePosts,
    fetchTransactions,
    startTransition,
  ]);

  const handlePrevClick = useCallback(() => {
    startTransition(() => {
      const newIndex = Math.max(currentIndex - limit, 0);
      setCurrentIndex(newIndex);
    });
  }, [currentIndex, limit, startTransition]);

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
      <Suspense fallback={<div>Loading list</div>}>
        {displayedTransactions.length > 0 ? (
          <ListGroup className="h-100">
            {displayedTransactions.map((transaction) => (
              <ListGroup.Item key={transaction.orderId} className="h-100">
                <TransactionCard transaction={transaction} loading={false} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <div className="fs-2 d-flex flex-column justify-content-center align-items-center">
            <div>You have not purchased anything!</div>
            <Button className="w-20">
              <NavLink as={RRNavLink} to="/store">
                Visit the store
              </NavLink>
            </Button>
          </div>
        )}
      </Suspense>
    </>
  );
}

export default TransactionListContent;

//Within Suspense:
/*
      <Suspense fallback={<div>Loading list</div>}>
        <ListGroup className="h-100">
          {displayedTransactions.length > 0 ? (
            displayedTransactions.map((transaction) => (
              <ListGroup.Item key={transaction.orderId} className="h-100">
                <TransactionCard transaction={transaction} loading={false} />
              </ListGroup.Item>
            ))
          ) : (
            <div>You have not purchased anything!</div>
          )}
        </ListGroup>
      </Suspense>

*/
