import { isValidRegistration } from "../../src/utilities/registrationValidation";

describe("isValidRegistration function", () => {
  it("returns with no error messages, when username and passwords are valid", () => {
    const testEmail = "testEmail@example.com";
    const password1 = "Abcdef22$$";
    const password2 = "Abcdef22$$";
    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };
    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(true);
    expect(errorMessage).toBe(null);
  });

  it("returns isValid as false, with error message: 'Passwords do not match'", () => {
    const testEmail = "testEmail@example.com";
    const password1 = "Abcdef22$$";
    const password2 = "Abcdeg22$$";
    const errorResult = "Passwords do not match.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Username is invalid.'", () => {
    const testEmail = "testEmailexample.com";
    const password1 = "Abcdef22$$";
    const password2 = "Abcdeg22$$";
    const errorResult = "Username is invalid.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Please enter a password.'", () => {
    const testEmail = "testUser@example.com";
    const password1 = "";
    const password2 = "Abcdef22$$";
    const errorResult = "Please enter a password.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns isValid as false, with error message: 'Please enter a password.'", () => {
    const testEmail = "testUser@example.com";
    const password1 = "Abcdef22$$";
    const password2 = "";
    const errorResult = "Please enter a password.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns with inValid as false, with error message: 'Password is not strong enough.' [missing special character]", () => {
    const testEmail = "testUser@example.com";
    const password1 = "Abcdefghijkl22";
    const password2 = "Abcdefghijkl22";
    const errorResult = "Password is not strong enough.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns with inValid as false, with error message: 'Password is not strong enough.' [missing number]", () => {
    const testEmail = "testUser@example.com";
    const password1 = "Abcdefghijkl@@";
    const password2 = "Abcdefghijkl@@";
    const errorResult = "Password is not strong enough.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns with inValid as false, with error message: 'Password is not strong enough.' [missing capital letter]", () => {
    const testEmail = "testUser@example.com";
    const password1 = "abcdefghijkl22$$";
    const password2 = "abcdefghijkl22$$";
    const errorResult = "Password is not strong enough.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });

  it("returns with inValid as false, with error message: 'Password is not strong enough.' [password is less than 8 characters]", () => {
    const testEmail = "testUser@example.com";
    const password1 = "Al22$$";
    const password2 = "Al22$$";
    const errorResult = "Password is not strong enough.";

    const testDetails = {
      email: testEmail,
      password1,
      password2,
    };

    const { isValid, errorMessage } = isValidRegistration(testDetails);
    expect(isValid).toBe(false);
    expect(errorMessage).toBe(errorResult);
  });
});
