import { transactionItem } from "./../../src/types";
import { getItemById } from "./../../src/utilities/getItemById";
import { calculateTotalPrice } from "./../../src/utilities/calculateTotalPrice";

jest.mock("./../../src/utilities/getItemById");

describe("calculateTotalPrice function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should calculate total price correctly", () => {
    let items: transactionItem[] = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ];
    (getItemById as jest.Mock).mockImplementation((id) => {
      if (id === 1) return { id: 1, price: 100 };
      if (id === 2) return { id: 2, price: 200 };
    });

    let total = 400;
    let result = calculateTotalPrice(items);
    expect(result).toBe(total);
  });

  it("should return 0 if no items are found", () => {
    const items: transactionItem[] = [
      {
        id: 5,
        quantity: 2,
      },
      { id: 6, quantity: 1 },
    ];

    (getItemById as jest.Mock).mockImplementation(() => {
      return null;
    });

    const result = calculateTotalPrice(items);
    expect(result).toBe(0);
  });

  it("should skip items that are not found", () => {
    const items: transactionItem[] = [
      { id: 1, quantity: 2 },
      { id: 3, quantity: 1 },
    ];
    (getItemById as jest.Mock).mockImplementation((id) => {
      if (id === 1) return { id: 1, price: 100 };
      return null;
    });
    const amount = 200;
    const result = calculateTotalPrice(items);
    expect(result).toBe(amount);
  });
});
