import { useLocation } from "react-router-dom";
import { PastOrder } from "./PastOrder";
import { Container } from "react-bootstrap";
export const Transaction = () => {
  const location = useLocation();
  const order = location?.state;
  console.log("Transaction state: ", location);
  return (
    <Container
      fluid
      className="w-100 h-100"
      style={{ margin: "0px", height: "0px" }}
    >
      <PastOrder order={order} />
    </Container>
  );
};
