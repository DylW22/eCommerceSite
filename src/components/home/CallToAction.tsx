import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
export const CallToAction = () => {
  const { theme } = useTheme();
  return (
    <Link
      to="/store"
      className={`text-decoration-none h-100 flex-fill rounded-4 d-flex align-items-center justify-content-center  ${
        theme === "light" ? "bg-midnight cta-link-light" : "bg-dusk cta-link"
      } `}
    >
      <div className="fs-4 fs-md-1 fw-bold">Shop now!</div>
    </Link>
  );
};
