import DOMPurify from "dompurify";
import { sanitizeInput } from "../../src/utilities/sanitizeCode";
import { render } from "@testing-library/react";
describe("sanitizeCode function", () => {
  //const input = '<h1>Hello, <script>alert("XSS");</script>World!</h1>';

  it("Should sanitize", () => {
    const dirtyHtml =
      '<script>alert("XSS attack!");</script><p>Hello, world!</p>';
    const cleanHtml = DOMPurify.sanitize(dirtyHtml);

    // Test that the clean HTML doesn't contain the script tag
    expect(cleanHtml).not.toContain("<script>");
  });

  /*
  it("should return null if input is null or undefined", () => {
    expect(sanitizeInput(null)).toBeNull();
    expect(sanitizeInput(undefined)).toBeNull();
  });

  it("Should remove HTML from the input string", () => {
    const input = '<h1>Hello, <script>alert("XSS");</script>World!</h1>';
    const { container } = render(sanitizeInput(input));

    // Verify that the HTML is sanitized and parsed correctly
    expect(container.firstChild?.nodeName).toBe("H1");
    expect(container.firstChild?.textContent).toBe("Hello, World!");
  });*/
});
