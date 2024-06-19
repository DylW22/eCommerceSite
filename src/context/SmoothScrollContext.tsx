import React, { createContext, useRef, useContext } from "react";

const SmoothScrollContext = createContext<any>({});

export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC = ({ children }) => {
  const cardRefs = useRef([]);

  const scrollToCard = (index: number) => {
    console.log("clicked: ", index);
    console.log(cardRefs.current);
    if (cardRefs.current?.[index]) {
      cardRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToNextCard = (index: number) => {
    //if (index < cardRefs.current.length - 1) {
    console.log("scrollToNextCard: ", cardRefs.current);
    if (cardRefs.current?.[index + 1]) {
      cardRefs.current[index + 1].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{ cardRefs, scrollToCard, scrollToNextCard }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};
