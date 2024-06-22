import { render, screen } from "@testing-library/react";
import { TestPage } from "../../src/pages/TestPage";
import React from "react";
import "@testing-library/jest-dom";
describe("renders TestPage", () => {
  test("should render TestPage", () => {
    render(<TestPage />);
    const testElement = screen.getByText("Test Page");
    const testChildElement = screen.getByText("I am a test Child");
    expect(testElement).toBeInTheDocument();
    expect(testChildElement).toBeInTheDocument();
  });
});
