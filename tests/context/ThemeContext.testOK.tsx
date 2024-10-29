import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../src/context/ThemeContext";
import "@testing-library/jest-dom/";

jest.mock("../../src/hooks/useLocalStorage", () => ({
  // useLocalStorage: jest.fn(() => ["light", jest.fn()]),
  useLocalStorage: jest.fn((_, defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    return [value, (newValue: string) => setValue(newValue)];
  }),
}));

describe("ThemeContext", () => {
  it("should render w/ ThemeContext", () => {
    const ChildComponent = () => {
      const { theme } = useTheme();
      return <div data-testid="theme">{theme}</div>;
    };

    const { getByTestId } = render(
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("light");
  });

  it("should update theme when setTheme is called ", () => {
    const ChildComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <div data-testid="theme">{theme}</div>
          <button onClick={() => setTheme("dark")}>Change Theme</button>
        </div>
      );
    };

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <ChildComponent />
      </ThemeProvider>
    );
    expect(getByTestId("theme").textContent).toBe("light");
    fireEvent.click(getByText("Change Theme"));
    expect(getByTestId("theme").textContent).toBe("dark");
  });
});
