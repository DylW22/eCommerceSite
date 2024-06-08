import { useLocation, useNavigation } from "react-router-dom";
export function Home() {
  const location = useLocation();
  const navigate = useNavigation();
  console.log("Home location: ", location);
  console.log("Navigate: ", navigate);
  return <div>Home</div>;
}
