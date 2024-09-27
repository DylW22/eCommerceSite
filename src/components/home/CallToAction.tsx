import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { Container } from "react-bootstrap";
export const CallToAction = () => {
  const { theme } = useTheme();
  return (
    <Container
      fluid
      className={`p-4 flex-fill rounded-4 d-flex align-items-center justify-content-center ${
        theme === "light" ? "bg-midnight cta-link-light" : "bg-dusk cta-link"
      }`}
    >
      <Link
        to="/store"
        className={`text-decoration-none h-100  d-flex align-items-center justify-content-center`}
      >
        <div className="fs-2 fs-md-1 fw-bold">Shop now!</div>
      </Link>
    </Container>
  );
};
