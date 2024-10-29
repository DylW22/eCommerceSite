import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Container } from "react-bootstrap";
const Success = () => {
  const [count, setCount] = useState(5);
  const { emptyCart } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {
    emptyCart();
    if (count < 1) {
      return navigate("/history");
    }
    const intervalId = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count]);

  return (
    <Container
      fluid
      style={{ height: "calc(100vh - 85px)" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div>Payment successful. Your items are on their way.</div>
      <div>You will be redirected in {count}..</div>
    </Container>
  );
};

export default Success;
