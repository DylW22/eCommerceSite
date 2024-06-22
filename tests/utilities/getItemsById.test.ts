import { getItemById } from "./../../src/utilities/getItemById";

let testItems = [
  { id: 1, name: "Item 1", price: 10, imgUrl: "test1.png", category: "Book" },
  { id: 2, name: "Item 2", price: 10, imgUrl: "test2.png", category: "Book" },
  { id: 3, name: "Item 3", price: 10, imgUrl: "test3.png", category: "Book" },
];

describe("getItemById function", () => {
  it("Should return the correct item by ID", () => {
    const itemId = 2;
    const expectedItem = testItems.find((item) => item.id === itemId);
    expect(getItemById(itemId, testItems)).toEqual(expectedItem);
  });

  it("should return null if item ID is not found", () => {
    const itemId = 100;

    expect(getItemById(itemId, testItems)).toBeNull();
  });

  it("should return null if item ID is falsy", () => {
    const itemId = 0;

    expect(getItemById(itemId, testItems)).toBeNull();
  });
  it("should return null if items array is empty", () => {
    const itemId = 1;

    expect(getItemById(itemId, [])).toBeNull();
  });
});
