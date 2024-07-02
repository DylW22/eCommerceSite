import { Container } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { HeroSection } from "../components/about/HeroSection";

export function About() {
  const { styles } = useDynamicBackground();

  //console.log("styles: ", styles);
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
      <h1 className="fw-bold fs-1">This is a fake e-commerce site</h1>
      <p>Sign up and pretend to buy some fake products. Have fun!</p>
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
