import { OutletContextType } from "../routing/ProtectedRoute";
import { useOutletContext } from "react-router-dom";
import { useTransactions } from "../../hooks/useTransactions";
import SidePanelList from "./SidePanelList";
import { Container } from "react-bootstrap";
import React from "react";

const SidePanel: React.FC = () => {
  const queryRef = useOutletContext<OutletContextType>();

  const limit = 2;
  const { transactions } = useTransactions(queryRef.reference, limit);

  if (transactions.length === 0) {
    return <div>Purchase something first.</div>;
  }
  //To fix
  const tempTransactions = transactions.slice(0, 10);
  return (
    <Container fluid className="m-0 p-0 h-100">
      <SidePanelList transactions={tempTransactions} />
    </Container>
  );
};

export default SidePanel;
