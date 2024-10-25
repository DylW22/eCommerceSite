import { Outlet, useRouteLoaderData } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useBackgroundQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { useTheme } from "../context/ThemeContext";
import { locationObject } from "../types";
import { useEffect } from "react";
import { useQueryFilterContext } from "../context/FilterQueryContext";

export function Root() {
  const { theme } = useTheme();
  const [result] = useBackgroundQuery(GET_TRANSACTIONS, {
    variables: { offset: 0, limit: 4 },
    errorPolicy: "all",
  });
  const { styles } = useDynamicBackground();
  const location = useRouteLoaderData("root") as locationObject;
  const { setQuery } = useQueryFilterContext();

  useEffect(() => {
    setQuery(location.q);
  }, [location]);

  return (
    <div
      style={{
        background: styles,
        minHeight: "100vh",
      }}
      className={`d-flex flex-column ${theme === "light" ? "" : "text-white"}`}
    >
      <Header />
      <Outlet context={{ reference: result }} />
    </div>
  );
}
