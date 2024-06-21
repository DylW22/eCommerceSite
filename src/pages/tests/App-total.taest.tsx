import React from "react";
import { RoutesConfig } from "../../data/routesConfig";
import {
  useLocation,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

//const mocks: readonly MockedResponse<any, any>[] | undefined = [];

describe("App", () => {
  it("Renders everything", () => {
    const router = createMemoryRouter(RoutesConfig as any, {
      initialEntries: ["/"],
    });
    const { getByText } = render(
      //addTypename = {false}
      // <MockedProvider mocks={mocks}>
      <RouterProvider router={router} />
      //</MockedProvider>
    );
    const mainText = getByText(/This is a wider/i);
    expect(mainText).toBeInTheDocument();
  });
});
