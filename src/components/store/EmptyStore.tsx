import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
const EmptyStore: React.FC = () => {
  const param = new URLSearchParams(useLocation().search);

  return (
    <Container
      fluid
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h3>{`No items to display for query "${param.get("q")}"`}</h3>
    </Container>
  );
};

export default EmptyStore;
