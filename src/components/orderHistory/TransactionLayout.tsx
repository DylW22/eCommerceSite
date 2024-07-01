import { Container } from "react-bootstrap";
import { Suspense } from "react";
import { TransactionsListSidePanelSkeleton } from "./TransactionsListSidePanelSkeleton.tsx";
import { TransactionsListSidePanel } from "./TransactionsListSidePanel.tsx";

export const TransactionLayout = () => {
  return (
    <Container
      fluid
      className="shadow-lg h-100 "
      style={{ padding: 0, margin: 0, bottom: "" }}
    >
      <Suspense fallback={<TransactionsListSidePanelSkeleton />}>
        <TransactionsListSidePanel />
      </Suspense>
    </Container>
  );
};
