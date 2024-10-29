import { LoginForm } from "../../src/components/login/LoginForm";
import { render, screen, fireEvent } from "@testing-library/react";
import React, { act } from "react";
import {
  ActionFunction,
  BrowserRouter,
  createBrowserRouter,
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import "@testing-library/jest-dom/";
import { action as LoginAction } from "../../src/pages/Login";
//https://stackoverflow.com/questions/74019392/using-react-error-boundary-with-react-router

//import userEvent from "@testing-library/user-event";

// const renderWithRouter = (ui, { route = "/" } = {}) => {
//   window.history.pushState({}, "Test page", route);

//   return {
//     //  user: userEvent.setup(),
//     ...render(ui, { wrapper: BrowserRouter }),
//   };
// };
//https://chatgpt.com/c/ebbbf70a-9ced-4bef-b0d0-bd1d7c816db1

const mockPropsIsNotSubmitting = {
  isSubmitting: false,
  referrer: ["/account"],
};

const mockPropsIsSubmitting = {
  isSubmitting: true,
  referrer: ["/account"],
};

const routesConfigIsSubmitting = [
  {
    path: "/",
    element: <LoginForm {...mockPropsIsSubmitting} />,
    action: () => {
      return "Hello";
    },
  },
];

const routesConfigIsNotSubmitting = [
  {
    path: "/",
    element: <LoginForm {...mockPropsIsNotSubmitting} />,
    action: () => {
      return "Hello";
    },
  },
];

const routerIsNotSubmitting = createBrowserRouter(routesConfigIsNotSubmitting);
const routerIsSubmitting = createBrowserRouter(routesConfigIsSubmitting);

describe("LoginForm", () => {
  const mockSubmit = jest.fn();

  /*beforeEach(() => {
    render(<LoginForm {...mockProps} />);
  });*/
  test("renders email input", () => {
    render(<RouterProvider router={routerIsNotSubmitting} />);
    const emailInput = screen.getByPlaceholderText(/Enter email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(<RouterProvider router={routerIsNotSubmitting} />);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders submit button", () => {
    const { getByText } = render(
      <RouterProvider router={routerIsNotSubmitting} />
    );
    const submitButton = getByText(/Submit/i);
    expect(submitButton).toBeInTheDocument();
  });

  test("displays submitting state", () => {
    const { getByText } = render(
      <RouterProvider router={routerIsSubmitting} />
    );
    const submitButton = getByText(/Submitting/i);
    expect(submitButton).toBeInTheDocument();
  });

  test("submits the form with email and password", async () => {
    const { getByText } = render(
      <RouterProvider router={routerIsNotSubmitting} />
    );
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.submit(screen.getByRole("form"));
    });
    const element = screen.queryByText("Submitting..");
    expect(element).toBe(null);
  });
});
