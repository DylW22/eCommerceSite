import { filterByQuery } from "../../src/utilities/filterByQuery";

let testItems = [
  { id: 1, name: "Item 1", price: 10, imgUrl: "test1.png", category: "Book" },
  { id: 2, name: "Item 2", price: 10, imgUrl: "test2.png", category: "Book" },
  { id: 3, name: "Item 3", price: 10, imgUrl: "test3.png", category: "Car" },
];

describe("filterByQuery function", () => {
  it("Should return the correct items by search term, 'name' ", () => {
    const searchTerm = "Item";

    const expectedItems = [
      {
        id: 1,
        name: "Item 1",
        price: 10,
        imgUrl: "test1.png",
        category: "Book",
      },
      {
        id: 2,
        name: "Item 2",
        price: 10,
        imgUrl: "test2.png",
        category: "Book",
      },
      {
        id: 3,
        name: "Item 3",
        price: 10,
        imgUrl: "test3.png",
        category: "Car",
      },
    ];

    expect(filterByQuery(searchTerm, testItems)).toEqual(expectedItems);
  });

  it("Should return the correct items by search term, 'category'", () => {
    const searchTerm = "Boo";

    const expectedItems = [
      {
        id: 1,
        name: "Item 1",
        price: 10,
        imgUrl: "test1.png",
        category: "Book",
      },
      {
        id: 2,
        name: "Item 2",
        price: 10,
        imgUrl: "test2.png",
        category: "Book",
      },
    ];

    expect(filterByQuery(searchTerm, testItems)).toEqual(expectedItems);
  });

  it("Should return the correct items by search term, 'category' === 'car' ", () => {
    const searchTerm = "car";

    const expectedItems = [
      {
        id: 3,
        name: "Item 3",
        price: 10,
        imgUrl: "test3.png",
        category: "Car",
      },
    ];

    expect(filterByQuery(searchTerm, testItems)).toEqual(expectedItems);
  });
  it("Should return null if there are no matching items  'category' === 'weapons' ", () => {
    const searchTerm = "weapons";

    expect(filterByQuery(searchTerm, testItems)).toEqual([]);
  });

  /*
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
    
  });*/
});
