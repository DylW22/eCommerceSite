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
describe("LoginForm", () => {
  test("should render LoginForm", async () => {
    const mockProps = {
      isSubmitting: false,
      referrer: ["/account"],
    };
    const routesConfig = [
      {
        path: "/",
        element: <LoginForm {...mockProps} />,
        action: () => {
          return "Hello";
        },
      },
    ];

    /*const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });*/

    const router = createBrowserRouter(routesConfig);

    const { getByText } = render(<RouterProvider router={router} />);
    const loginButton = getByText(/Submit/i);
    expect(loginButton).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(screen.getByLabelText("Email address"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.submit(screen.getByRole("form"));
    });

    // Assert that form is submitted
    const element = screen.queryByText("Submitting..");
    expect(element).toBe(null);
  });

  test("isSubmitting displayed", () => {
    const mockProps = {
      isSubmitting: true,
      referrer: ["/account"],
    };

    const routesConfig = [
      {
        path: "/",
        element: <LoginForm {...mockProps} />,
        action: () => {
          return "Hello";
        },
      },
    ];

    const router = createBrowserRouter(routesConfig);

    const { getByText } = render(<RouterProvider router={router} />);
    const submittingState = getByText(/Submitting../i);
    expect(submittingState).toBeInTheDocument();
  });
});

//await screen.findByText("Submitting...");

//expect(screen.getByText("Submitting..")).toBeInTheDocument();
//const testElement = screen.getByText(/Submit/i);
//expect(testElement).toBeInTheDocument();

//https://chatgpt.com/c/ebbbf70a-9ced-4bef-b0d0-bd1d7c816db1
// const routesConfig = (appContext: any): RouteObject[] => {
//   return [
//     {
//       path: "/",
//       element: <LoginForm {...mockProps} />,
//       action: LoginAction(appContext) as ActionFunction,
//       // errorElement: <div>error</div>,
//     },
//   ];
// };
