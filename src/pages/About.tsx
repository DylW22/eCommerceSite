import { Container, Row } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { HeroSection } from "../components/about/HeroSection";

export function About() {
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
      <HeroSection />
      <Row className="my-2">
        <h1 className="fw-bold fs-1">This is a fake e-commerce site</h1>
        <p>Sign up and pretend to buy some fake products. Have fun!</p>
        <p>
          Go through the purchasing process and you will see the items purchased
          populate the &apos;Past orders&apos; section of Account dropdown
          button.
        </p>
      </Row>
    </Container>
  );
}
