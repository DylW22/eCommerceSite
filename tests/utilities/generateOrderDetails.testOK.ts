import { generateOrderDetails } from "../../src/utilities/generateOrderDetails";
//import { getCurrentDateBasedOnLocale } from "../../__mocks__/getCurrentDateBasedOnLocale";
import { getCurrentDateBasedOnLocale } from "../../src/utilities/getCurrentDate";
import { CartItem } from "../../src/types";

// Mocking the getCurrentDateBasedOnLocale function
jest.mock("../../__mocks__/getCurrentDateBasedOnLocale");

describe("generateOrderDetails function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should generate order details with the correct data", () => {
    const mockDate = getCurrentDateBasedOnLocale("en-US");
    //(getCurrentDateBasedOnLocale as jest.Mock).mockReturnValue(mockDate);
    const cartItems: CartItem[] = [];

    const result = generateOrderDetails(cartItems);

    expect(result.orderDate).toBe(mockDate);
    expect(result.items).toEqual([]);
    const resultValue = Number(result.orderId);
    expect(resultValue).toBeGreaterThanOrEqual(0);
    expect(resultValue).toBeLessThanOrEqual(100);
  });

  it("should generate order details with items when cartItems is provided", () => {
    // Arrange
    const mockDate = getCurrentDateBasedOnLocale("en-US");

    //(getCurrentDateBasedOnLocale as jest.Mock).mockReturnValue(mockDate);
    const cartItems: CartItem[] = [
      { id: "1", quantity: 2 },
      { id: "2", quantity: 1 },
    ];

    // Act
    const result = generateOrderDetails(cartItems);

    // Assert
    expect(result.orderDate).toBe(mockDate);
    expect(result.items).toEqual([
      { id: "1", quantity: 2 },
      { id: "2", quantity: 1 },
    ]);

    const resultValue = Number(result.orderId);
    expect(resultValue).toBeGreaterThanOrEqual(0);
    expect(resultValue).toBeLessThanOrEqual(100);
  });
});
