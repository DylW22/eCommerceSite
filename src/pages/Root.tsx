import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
//import { Container } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { useBackgroundQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../queries";
// import { useSymbol } from "../context/SymbolContext";
// import { useEffect, useState } from "react";
export function Root() {
  const { theme } = useTheme();
  const [result, query] = useBackgroundQuery(GET_TRANSACTIONS, {
    variables: { offset: 0, limit: 4 },
  });

  //console.log("result: ", result);
  //console.log("query: ", query);
  /* const { updateSymbol } = useSymbol();

  const [queryRef] = useBackgroundQuery(GET_TRANSACTIONS);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const queryRef = await queryRef.toPromise(); // Wait for the data to be fully loaded
        setLoading(false); // Data loaded, set loading state to false
        updateSymbol(queryRef);
        //console.log("result: ", result);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [queryRef]);
  */

  /*useEffect(() => {
    updateSymbol(queryRef as any);
  }, [queryRef]);
*/
  return (
    <div //changed from ? "custom-lightGray" : ..
      className={`${theme === "light" ? "bg-white" : "bg-midnight text-white"}`}
    >
      <Header />
      <Outlet context={result} />
    </div>
  );
}
