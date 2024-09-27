import { Col, Container, Row } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { HeroSection } from "../components/about/HeroSection";
import aboutCardsData from "../data/aboutCardsData.json";
import { AboutCard } from "../components/about/AboutCard";
export function About() {
  const { styles } = useDynamicBackground();

  return (
    <Container
      fluid
      style={{ background: styles, height: "100%" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <HeroSection />
      <Row className="mb-4">
        <h2 className="fw-bold fs-1">Features:</h2>
      </Row>
      <Row className="g-3 mb-3 d-flex justify-content-center align-items-stretch">
        {aboutCardsData.map((card) => (
          <Col xs={10} md={5} className="d-flex">
            <AboutCard {...card} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
