import { About } from "../About";
import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
describe("About test", () => {
  it("Renders correctly", () => {
    const routesConfig = [
      {
        path: "/",
        element: <About />,
      },
    ];

    const router = createMemoryRouter(routesConfig, {
      initialEntries: ["/"],
    });
    const { getByText } = render(<RouterProvider router={router} />);

    const mainText = getByText(/This is a fake e-commerce site./i);
    expect(mainText).toBeInTheDocument();
  });
});
