import { sanitizeInput } from "../../src/utilities/sanitizeCode";
import { render } from "@testing-library/react";
import DOMPurify from "dompurify";
jest.mock("dompurify", () => ({
  sanitize: jest.fn((input) => input), // Will mock DOMPurify.sanitize method
}));

describe("sanitizeCode function", () => {
  test("should return an empty string if input is null or undefined", () => {
    expect(sanitizeInput(null)).toBe("");
    expect(sanitizeInput(undefined)).toBe("");
  });
});
