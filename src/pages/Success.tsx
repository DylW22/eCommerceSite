import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
const Success = () => {
  const [count, setCount] = useState(5);
  const { emptyCart } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {
    emptyCart();
    if (count < 1) {
      return navigate("/");
    }
    const intervalId = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <div>
      <div>Payment successful. Your items are on their way.</div>
      <div>You will be redirected in {count}..</div>
    </div>
  );
};

export default Success;
