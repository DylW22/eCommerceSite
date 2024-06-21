import React, { act } from "react";
import { RoutesConfig } from "../../data/routesConfig";
import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Home } from "../Home";
import { Root } from "../Root";
import { AuthProvider } from "../../context/AuthContext";
import { ThemeProvider } from "../../context/ThemeContext";
import { loader as SearchBarLoader } from "../../components/header/SearchBar";

//https://stackoverflow.com/questions/74497916/referenceerror-request-is-not-defined-when-testing-with-react-router-v6-4
const mockRoutes = [
  {
    path: "/",
    element: (
      <ThemeProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </ThemeProvider>
    ),
    loader: SearchBarLoader,
    //element: <Home />,
  },
];

describe("Navigates from Home to About", () => {
  it("Navigates", () => {
    act(() => {
      const router = createMemoryRouter(mockRoutes as any, {
        initialEntries: ["/"],
      });

      const { getByText } = render(<RouterProvider router={router} />);
      const mainText = getByText(/Home/i);
      expect(mainText).toBeInTheDocument();
    });
  });
});
