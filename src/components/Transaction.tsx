import { useLocation } from "react-router-dom";
import { PastOrder } from "./PastOrder";
export const Transaction = () => {
  const location = useLocation();
  const order = location?.state;

  return <PastOrder order={order} />;
};
