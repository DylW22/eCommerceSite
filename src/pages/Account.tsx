import { Container } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";

export function Account() {
  const { styles } = useDynamicBackground();
  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 72px)",
        background: `${styles}`,
      }}
      className="m-0 p-4"
    >
      <h1 className="fw-bold fs-1">Your account</h1>
    </Container>
  );
}
