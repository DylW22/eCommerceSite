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
import { Popover } from "../components/home/Popover";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
export function Home() {
  const popoverRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const { styles } = useDynamicBackground();
  console.log("styles: ", styles);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.addEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container
      className="relative p-0"
      fluid
      style={{
        zIndex: 1,
        background: `linear-gradient(to right, ${styles}, #6446fc)`, //#423ffb
      }}
    >
      {isOpen && <Popover className={"d-none"} ref={popoverRef} />}
      <Row className="p-0 m-0">
        <Col md={6} className="py-4 order-md-2">
          <Card className="">
            <img className="" src={backgroundImg} />

            <CardBody className="card-body">
              <CardTitle className="card-title">Image Title</CardTitle>
              <CardText className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col
          md={3}
          className="p-4 d-flex flex-column align-items-center my-10 order-md-1"
        >
          <Testimonials />
        </Col>
        <Col
          md={3}
          className="p-4 d-flex flex-column align-items-center my-10 order-md-3"
        >
          <div className="flex-fill bg-danger w-100">Shop now</div>
          <div className="flex-fill bg-secondary w-100">
            Subscribe to newsletter
          </div>
        </Col>
      </Row>
      <Row className="text-center d-flex justify-content-center p-0 m-0">
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
      </Row>
    </Container>
  );
}

/*

    <Container className="bg-primary relative p-0" fluid style={{ zIndex: 1 }}>
      {isOpen && <Popover className={"d-none"} ref={popoverRef} />}
      <Row className="p-0">
        <Col md={6} className="py-4 order-md-2">
        //offset-md-1
          <Card className="">
            <img className="" src={backgroundImg} />

            <CardBody className="card-body">
              <CardTitle className="card-title">Image Title</CardTitle>
              <CardText className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col
          md={3}
          className="p-4 d-flex flex-column align-items-center my-10 order-md-1"
        >
          <Testimonials />
        </Col>
        <Col
          md={3}
          className="p-4 d-flex flex-column align-items-center my-10 order-md-3"
        >
          <div className="flex-fill bg-danger w-100">Shop now</div>
          <div className="flex-fill bg-secondary w-100">
            Subscribe to newsletter
          </div>
        </Col>
      </Row>
      <Row className="text-center d-flex justify-content-center">
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
        <Col md={3} className="bg-warning mx-4">
          <div className="" style={{ height: "300px" }}>
            Hot product
          </div>
        </Col>
      </Row>
    </Container>
    */
