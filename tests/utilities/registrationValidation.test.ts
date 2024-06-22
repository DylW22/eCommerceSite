import { isValidRegistration } from "../../src/utilities/registrationValidation";

describe("isValidRegistration function", () => {
  it("returns isValid with no error messages, when passwords match w/ valid username", () => {
    let testUsername = "Hello123";
    let password1 = "abcdef";
    let password2 = "abcdef";

    const { isValid, errorMessage } = isValidRegistration(
      testUsername,
      password1,
      password2
    );
    expect(isValid).toBe(true);
    expect(errorMessage).toBe(undefined);
  });

  it("returns isValid as false, with error message: 'Passwords do not match'", () => {
    let testUsername = "Hello123";
    let password1 = "abcdef";
    let password2 = "abcdeg";
    let errorResult = "Passwords do not match.";

    const { isValid, errorMessage } = isValidRegistration(
      testUsername,
      password1,
      password2
    );
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Username is invalid.'", () => {
    let testUsername = "";
    let password1 = "abcdef";
    let password2 = "abcdef";
    let errorResult = "Username is invalid.";

    const { isValid, errorMessage } = isValidRegistration(
      testUsername,
      password1,
      password2
    );
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Please enter a password.'", () => {
    let testUsername = "HelloIAmBill";
    let password1 = "";
    let password2 = "abcdef";
    let errorResult = "Please enter a password.";

    const { isValid, errorMessage } = isValidRegistration(
      testUsername,
      password1,
      password2
    );
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Please enter a password.'", () => {
    let testUsername = "HelloIAmBill";
    let password1 = "abcdef";
    let password2 = "";
    let errorResult = "Please enter a password.";

    const { isValid, errorMessage } = isValidRegistration(
      testUsername,
      password1,
      password2
    );
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });
});
