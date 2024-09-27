import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import backgroundImg from "../assets/background.jpg";
import { Testimonials } from "../components/home/Testimonials";
import Popover from "../components/home/Popover";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import SubscribeNewsletter from "../components/home/SubscribeNewsletter";
import { CallToAction } from "../components/home/CallToAction";
function Home() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container
      className="relative p-0"
      fluid
      style={{
        zIndex: 1,
      }}
    >
      {isOpen && <Popover className={"d-none"} ref={popoverRef} />}
      <Row className="p-0 m-0 mx-2">
        <Col md={6} className="py-4 px-4 order-md-2">
          <Card className="p-2">
            <img className="" src={backgroundImg} />

            <CardBody className="card-body">
              <CardTitle className="card-title">Our brand:</CardTitle>
              <CardText className="card-text">
                Browse mock products on a mock e-commerce website
              </CardText>
            </CardBody>
          </Card>
        </Col>

        <Col
          md={3}
          className="p-4 my-10 d-flex flex-column align-items-center justify-content-between order-md-3"
        >
          <Row className="flex-fill w-100 py-2 h-100">
            <CallToAction />
          </Row>
          <Row className="flex-fill w-100 py-2 h-100">
            <SubscribeNewsletter />
          </Row>
        </Col>
        <Col
          md={3}
          className="p-2 d-none d-md-flex flex-column align-items-center justify-content-center my-10 order-md-1"
        >
          <Testimonials />
        </Col>
      </Row>
      <Row className="text-center d-flex flex-column flex-md-row justify-content-evenly p-0 mx-5 order-md-1">
        <FeaturedProducts />
      </Row>
      <Row className="d-flex d-md-none p-0 m-0">
        <Col className="p-4 d-flex flex-column align-items-center my-10 min-height-200">
          <Testimonials />
        </Col>
      </Row>
    </Container>
  );
}
export { Home };
