import { useState, useTransition, useEffect, Suspense } from "react";
import { ListGroup } from "react-bootstrap";
import { OrderData } from "../types";
import TransactionCard from "../components/orderHistory/TransactionCard";

interface TransactionListProps {
  transactions: OrderData[];
  fetchTransactions: () => void;
  hasMorePosts: boolean;
  limit: number;
}

function TransactionListFinal({
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

  const updateDisplayedTransactions = () => {
    const newDisplayedTransactions = transactions.slice(
      currentIndex,
      currentIndex + limit
    );
    setDisplayedTransactions(newDisplayedTransactions);
  };

  const handleNextClick = () => {
    startTransition(() => {
      const newIndex = currentIndex + limit;
      if (newIndex >= transactions.length - 2 * limit && hasMorePosts) {
        fetchTransactions();
      }
      setCurrentIndex(newIndex);
    });
  };
  const handlePrevClick = () => {
    startTransition(() => {
      const newIndex = Math.max(currentIndex - limit, 0);
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
      <Suspense fallback={<div>Loading list</div>}>
        <ListGroup className="h-100">
          {displayedTransactions.map((transaction) => (
            <ListGroup.Item key={transaction.orderId} className="h-100">
              <TransactionCard transaction={transaction} loading={false} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Suspense>
    </>
  );
}

export default TransactionListFinal;
