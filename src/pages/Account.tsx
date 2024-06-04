import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
export function Account() {
  const location = useLocation();
  const history = location?.state?.from?.state?.from;

  if (history === "checkout") return <Navigate to="/checkout" />;
  console.log("Account", history);
  return <div>Your account</div>;
}
