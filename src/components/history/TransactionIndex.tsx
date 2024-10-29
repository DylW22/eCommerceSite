import { useOutletContext } from "react-router-dom";
import { OutletContextType } from "../routing/ProtectedRoute";
import { useTransactions } from "../../hooks/useTransactions";
import TransactionCard, { TransactionCardSkeleton } from "./TransactionCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useCallback, useEffect, useState, useTransition } from "react";
import { TransactionsData } from "../../types";
// import { useDynamicBackground } from "../../hooks/useDynamicBackground";

const TransactionIndex = () => {
  const [isPending, startTransition] = useTransition();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedTransactions, setDisplayedTransactions] = useState<
    TransactionsData[]
  >([]);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const queryRef = useOutletContext<OutletContextType>();
  // const { styles } = useDynamicBackground("linear", 50);

  const limit = 2;
  const { transactions } = useTransactions(queryRef.reference, limit);

  const numPosts = transactions.length;
  const updateDisplayedTransactions = useCallback(() => {
    const newDisplayedTransactions = transactions.slice(
      currentIndex,
      currentIndex + limit
    );

    setDisplayedTransactions(newDisplayedTransactions);
  }, [transactions, currentIndex, limit]);

  useEffect(() => {
    updateDisplayedTransactions();
    if (currentIndex + limit >= numPosts) {
      setHasMorePosts(false);
    } else {
      setHasMorePosts(true);
    }
  }, [transactions, currentIndex, limit]);

  const handlePrevClick = useCallback(() => {
    startTransition(() => {
      const newIndex = Math.max(currentIndex - limit, 0);
      setCurrentIndex(newIndex);
    });
  }, [currentIndex, limit, startTransition]);

  const handleNextClick = useCallback(() => {
    setCurrentIndex((prev) => prev + limit);
  }, [limit]);

  return (
    <Container
      // style={{ background: styles }}
      className="h-100 m-0 p-0 d-flex flex-column"
    >
      <Row style={{ minHeight: "520px" }} className="m-0 p-0">
        {displayedTransactions.length > 0 ? (
          displayedTransactions.map((transaction) => (
            <div className="m-0 p-0 flex-grow-1 my-1" key={transaction.orderId}>
              <TransactionCard transaction={transaction} />
            </div>
          ))
        ) : (
          <div className="m-0 p-0 flex-grow-1 my-1">
            <TransactionCardSkeleton />
          </div>
        )}
      </Row>
      <Row
        className="p-0 m-0 d-flex justify-content-center"
        style={{ height: "50px" }}
      >
        <Col xs={4} className="p-0 m-0 mx-2">
          <Button
            className="w-100 mx-2 p-2"
            onClick={handlePrevClick}
            disabled={isPending || currentIndex < limit}
          >
            {"<"}
          </Button>
        </Col>
        <Col xs={4} className="p-0 m-0 mx-2">
          <Button
            className="w-100 mx-2 p-2"
            onClick={handleNextClick}
            disabled={isPending || !hasMorePosts}
          >
            {">"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionIndex;
