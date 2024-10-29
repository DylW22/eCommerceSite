import { Col, Container, Row } from "react-bootstrap";
// import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { HeroSection } from "../components/about/HeroSection";
import aboutCardsData from "../data/aboutCardsData.json";
import { AboutCard } from "../components/about/AboutCard";

export function About() {
  return (
    <Container
      fluid
      className="h-100 d-flex flex-column justify-content-center align-items-center"
    >
      <HeroSection />
      <Row className="mb-2">
        <h2 className="fw-bold fs-1">Features:</h2>
      </Row>
      <Row className="p-0 mb-3 d-flex justify-content-center align-items-stretch w-100 g-2">
        {aboutCardsData &&
          aboutCardsData.map((card) => (
            <Col key={card.id} sm={12} md={5} className="d-flex mx-auto">
              <AboutCard {...card} />
            </Col>
          ))}
      </Row>
    </Container>
  );
}
