import { QueryRef } from "@apollo/client";
import React, { createContext, useContext, useState } from "react";

/*const SymbolContext = createContext({
  symbol: Symbol("mySymbol"),
  updateSymbol: (newSymbol) => {},
});*/

type SymbolContextType = {
  symbol: symbol | null | QueryRef;
  updateSymbol: (symbol: symbol | null) => void;
};
const SymbolContext = createContext<SymbolContextType | undefined>(undefined);
export const useSymbol = (): SymbolContextType => {
  const context = useContext(SymbolContext);
  if (!context) {
    throw new Error("useSymbol must be used within a ThemeProvider");
  }
  return context;
};

export const SymbolProvider = ({ children }: { children: React.ReactNode }) => {
  // const [symbol, setSymbol] = useState(Symbol("mySymbol"));
  const [symbol, setSymbol] = useState("mySymbol") as any;

  const updateSymbol = (newSymbol: symbol | string | null | QueryRef): void => {
    setSymbol(newSymbol);
  };

  return (
    <SymbolContext.Provider value={{ symbol, updateSymbol }}>
      {children}
    </SymbolContext.Provider>
  );
};
