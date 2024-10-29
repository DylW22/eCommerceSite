import { useState } from "react";
import { Card, CardFooter } from "react-bootstrap";
import { Link } from "react-router-dom";
interface AboutCardProps {
  title: string;
  content: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({
  title,
  content,
}: AboutCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Card
      onClick={handleClick}
      className={`w-100 p-0 m-0 position-relative`}
      style={{
        height: isOpen ? "200px" : "50px",
        transition: "all 300ms ease-in-out",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Card.Body className="text-center">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
      <Card.Text
        className={`position-absolute ${isOpen ? "rotate-arrow" : ""}`}
        style={{ top: "10px", right: "20px" }}
      >
        &#10148;
      </Card.Text>
      <CardFooter className="text-center">
        <Link to="/" className="btn btn-primary">
          Learn more
        </Link>
      </CardFooter>
    </Card>
  );
};
