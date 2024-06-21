//LoginForm.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/"; //extend-expect";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("renders login form", () => {
    render(<LoginForm />);
    // expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    //expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    //expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });
});
