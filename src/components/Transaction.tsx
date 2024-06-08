import React from "react";
import { useNavigation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { PastOrder } from "./PastOrder";
export const Transaction = () => {
  const location = useLocation();
  // const navigate = useNavigation();

  const order = location?.state;

  return <PastOrder order={order} />;
};
