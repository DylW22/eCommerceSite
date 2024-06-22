import { RegisterForm } from "../../src/components/login/RegisterForm";
import { render, screen, fireEvent } from "@testing-library/react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "@testing-library/jest-dom/";
import React, { act } from "react";
describe("Registration render", () => {
  test("should render RegisterForm default, isSubmitting = false", async () => {
    const mockProps = {
      isSubmitting: false,
    };
    const routesConfig = [
      {
        path: "/",
        element: <RegisterForm {...mockProps} />,
      },
    ];
    const router = createBrowserRouter(routesConfig);
    const { getByText, getByLabelText } = render(
      <RouterProvider router={router} />
    );

    const submitButton = getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Re-enter your password")).toBeInTheDocument();
  });

  test("should render RegisterForm default, isSubmitting = true", () => {
    const mockProps = {
      isSubmitting: true,
    };
    const routesConfig = [
      {
        path: "/",
        element: <RegisterForm {...mockProps} />,
      },
    ];
    const router = createBrowserRouter(routesConfig);
    const { getByText } = render(<RouterProvider router={router} />);

    //const submitButton = screen.getByRole("button", { name: /submitting../i });

    const submitButton = getByText("Submitting..");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submitting..");
  });

  test("should trigger action when clicking submit", async () => {
    const mockAction = jest.fn().mockResolvedValue("dummy-action");

    const mockProps = {
      isSubmitting: false,
    };
    const routesConfig = [
      {
        path: "/",
        element: <RegisterForm {...mockProps} />,
        action: mockAction,
      },
    ];
    const router = createBrowserRouter(routesConfig);
    const { getByText, getByLabelText } = render(
      <RouterProvider router={router} />
    );

    const submitButton = getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();

    const emailInput = getByLabelText("Email address");
    const passwordInput = getByLabelText("Password");
    const reenterPasswordInput = getByLabelText("Re-enter your password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(reenterPasswordInput).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(emailInput, {
        target: { value: "test@example.com" },
      });
      fireEvent.change(passwordInput, {
        target: { value: "password123" },
      });
      fireEvent.change(reenterPasswordInput, {
        target: { value: "password123" },
      });
      fireEvent.submit(screen.getByRole("form"));
    });
    expect(mockAction).toHaveBeenCalled();
  });
});
