import { useState } from "react";
import downArrow from "../../assets/down-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";
interface AboutCardProps {
  title: string;
  content: string;
}

export const AboutCard: React.FC<AboutCardProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      style={{ cursor: "pointer", minHeight: isOpen ? "150px" : "50px" }}
      onClick={toggleOpen} //d-flex flex-column justify-content-center align-items-center
      className={`mb-3 border border-secondary bg-white p-3 rounded flex-fill text-midnight position-relative`}
    >
      <h3 className="text-center">{title}</h3>
      <div className="position-absolute" style={{ top: "10%", right: "5%" }}>
        <img
          style={{ height: "20px" }}
          className=""
          src={isOpen ? rightArrow : downArrow}
        />
      </div>
      {/*<p
        className="position-absolute top-0 fs-1 fw-bold"
        style={{ right: "2%" }}
      >
        {`${isOpen ? "Down" : ">"}`}
      </p>*/}
      <div
        style={{
          height: isOpen ? "auto" : "0",
          overflow: "hidden",
        }}
      >
        {isOpen && <p className="text-center mt-2">{content}</p>}
      </div>
    </div>
  );
};
