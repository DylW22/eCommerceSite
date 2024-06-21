import React, { act } from "react";
import { render } from "@testing-library/react";
import {
  BrowserRouter as Router,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import { ShoppingCartProvider } from "../../context/ShoppingCartContext";
import { Header } from "../../components/header/Header";
import { ThemeProvider } from "react-bootstrap";
import { loader as SearchBarLoader } from "../../components/header/SearchBar";
const mockRoutes = [
  {
    path: "/",
    element: (
      <ThemeProvider>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </ThemeProvider>
    ),
    loader: SearchBarLoader,
    //element: <Home />,
  },
];

describe("Header Component", () => {
  it("renders correctly", async () => {
    await act(async () => {
      const router = createMemoryRouter(mockRoutes as any, {
        initialEntries: ["/"],
      });

      const { getByText, getByRole } = render(
        <RouterProvider router={router} />
      );
      //const homeLink = await getByRole("link", { name: /Home/i });
      //expect(homeLink).toBeInTheDocument();

      //const storeButton = getByText(/Store/i);
      //expect(storeButton).toBeInTheDocument();
    });

    // Assertions to check for specific elements or text content within the header

    // Add more assertions as needed to test other elements in the header
  });

  // Add more test cases to cover different scenarios and interactions
});
