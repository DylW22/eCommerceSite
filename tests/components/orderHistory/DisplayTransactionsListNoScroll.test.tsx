import { render, screen, fireEvent } from "@testing-library/react";
import { DisplayTransactionsList } from "../../../src/components/orderHistory/DisplayTransactionsListNoScroll";
import { TransactionSidePanelContainerSkeleton } from "../../../src/components/orderHistory/TransactionSidePanelContainerSkeleton";
import { TransactionSidePanelContainerContent } from "../../../src/components/orderHistory/TransactionSidePanelContainerContent";

import React from "react";
import "@testing-library/jest-dom/";

jest.mock(
  "../../../src/components/orderHistory/TransactionSidePanelContainerSkeleton"
);
jest.mock(
  "../../../src/components/orderHistory/TransactionSidePanelContainerContent"
);

describe("DisplayTransactionsLimit", () => {
  beforeEach(() => {
    //Replace this mock
    (TransactionSidePanelContainerSkeleton as jest.Mock).mockReturnValue(
      <div>Loading...</div>
    );
    //Replace this mock
    (TransactionSidePanelContainerContent as jest.Mock).mockReturnValue(
      <div>Transactions Loaded</div>
    );
  });

  test("renders loading skeleton when loading is true", () => {
    render(<DisplayTransactionsList transactions={[]} loading={true} />);
    expect(screen.queryByText("Loading...")).toBeInTheDocument();
  });

  test("renders loading skeleton when transactions are empty", () => {
    render(<DisplayTransactionsList transactions={[]} loading={false} />);
    expect(screen.queryByText("Loading...")).toBeInTheDocument();
  });

  test("renders transactions when loading is false and transactions exist", () => {
    const mockTransactions = [
      {
        orderDate: "January 1999",
        orderId: 1,
        items: [{ id: 1, quantity: 100 }],
      },
    ];

    render(
      <DisplayTransactionsList
        transactions={mockTransactions}
        loading={false}
      />
    );

    expect(screen.getByText("Transactions Loaded")).toBeInTheDocument();
  });
});
