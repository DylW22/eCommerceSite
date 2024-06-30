import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useBackgroundQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries";
import { useDynamicBackground } from "../hooks/useDynamicBackground";

export function Root() {
  // const { theme } = useTheme();
  const [result] = useBackgroundQuery(GET_TRANSACTIONS, {
    variables: { offset: 0, limit: 4 },
  });

  const { styles } = useDynamicBackground();
  return (
    <div //changed from ? "custom-lightGray" : ..
      style={{ background: styles }}
      //className={`${theme === "light" ? "bg-white" : "bg-midnight text-white"}`}
    >
      <Header />
      <Outlet context={{ reference: result }} />
    </div>
  );
}
