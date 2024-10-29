import { Outlet, useRouteLoaderData } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useBackgroundQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { useTheme } from "../context/ThemeContext";
import { locationObject } from "../types";
import { useEffect } from "react";
import { useQueryFilterContext } from "../context/FilterQueryContext";
import { Container } from "react-bootstrap";

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
    <Container
      fluid
      style={{
        background: styles,
        height: "100%",
        minHeight: "100vh",
      }}
      className={`d-flex flex-column p-0 m-0 ${
        theme === "light" ? "" : "text-white"
      }`}
    >
      <Header />
      <div className="flex-grow-1">
        <Outlet context={{ reference: result }} />
      </div>
    </Container>
  );
}
