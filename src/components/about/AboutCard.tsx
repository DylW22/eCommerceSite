import { useState } from "react";

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
      style={{ cursor: "pointer" }}
      onClick={toggleOpen}
      className={`mb-3 border border-secondary bg-white p-3 rounded flex-fill d-flex flex-column justify-content-center align-items-center`}
    >
      <h3>{title}</h3>
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
