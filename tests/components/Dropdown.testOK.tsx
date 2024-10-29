import { AccountDropDown } from "../../src/components/header/AccountDropdown";
import React, { act } from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/";
import { AuthProvider, useAuth } from "../../src/context/AuthContext";

jest.mock("../../src/context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("AccountDropDown Component", () => {
  beforeEach(() => {
    // Reset mock before each test
    jest.clearAllMocks();
  });

  test("renders the AccountDropDown component", () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });

    render(<AccountDropDown />);

    expect(screen.getByText("Account")).toBeInTheDocument();
  });

  test("calls logout function when Logout item is clicked", async () => {
    const mockLogout = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ logout: mockLogout });

    render(<AccountDropDown />);

    //await act(async () => {
    // Simulate clicking the dropdown toggle to show the menu
    await act(async () => {
      fireEvent.click(screen.getByText("Account"));
    });
    // Simulate clicking the Logout item
    await act(async () => {
      fireEvent.click(screen.getByText("Logout"));
    });
    expect(mockLogout).toHaveBeenCalledTimes(1);
    // });
  });

  test("drop down will open", async () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });

    render(<AccountDropDown />);

    await act(async () => {
      fireEvent.click(screen.getByText("Account"));
    });

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Past orders")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    // Simulate clicking the dropdown toggle to show the menu
  });
  /*
  test("drop down will close upon clicking Account again", async () => {
    (useAuth as jest.Mock).mockReturnValue({ logout: jest.fn() });

    const { debug } = render(<AccountDropDown />);

    await act(async () => {
      fireEvent.click(screen.getByText("Account"));
    });
  
    console.log("dropdown open");
    debug();
    await act(async () => {
      fireEvent.click(screen.getByText("Account"));
      //expect(screen.getByText("Profile")).not.toBeVisible();
    });
    console.log("dropdown closed");
    debug();
    await waitFor(() => {
      expect(screen.queryByText("Profile")).not.toBeVisible();
      expect(screen.queryByText("Past orders")).not.toBeVisible();
      expect(screen.queryByText("Logout")).not.toBeVisible();
    });
  });
  */
});

/*
describe("AccountDropDown", () => {
  it("renders successfully", async () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );

    const { getByText } = render(<AccountDropDown />, { wrapper });
    const accountButton = screen.getByText("Account");

    await act(async () => {
      fireEvent.click(accountButton);
      expect(accountButton).toBeInTheDocument();
      const profileButton = screen.getByText(/profile/i);

      const pastOrdersButton = getByText("Past orders");
      const logoutButton = getByText("Logout");
      expect(profileButton).toBeInTheDocument();
      expect(pastOrdersButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
  });
});
*/
