import { Container, Row } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";

export function About() {
  const { styles } = useDynamicBackground();

  console.log("styles: ", styles);
  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 80px)",
        background: `linear-gradient(to right, ${styles})`,
      }}
      className="m-0 p-4 fw-bold fs-1"
    >
      This is a fake e-commerce site
    </Container>
  );
}
/*  return (
    <Container
      className={`mt-2 p-0 m-0`}
      style={{
        background: `linear-gradient(to right, ${styles})`,
        height: "100vh",
      }}
    >
      <p className="w-100">This is a fake e-commerce site.</p>
    </Container>
  );
}
*/
/*
    <Container
      className={`mt-2 p-0 m-0 flex-fill h-100 flex-grow-1 w-100`}
      style={{ background: `linear-gradient(to right, ${styles})` }}
    >
      <p className="w-100">This is a fake e-commerce site.</p>
    </Container>
*/
