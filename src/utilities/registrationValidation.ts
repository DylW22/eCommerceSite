type validationResult = {
  isValid: boolean;
  errorMessage?: string;
};
export const isValidRegistration = (
  username: string,
  password1: string,
  password2: string
): validationResult => {
  // Your validation logic here
  //  let isValid = false;
  // let errorMessage: string | undefined;

  if (!username) {
    return { isValid: false, errorMessage: "Username is invalid." };
  }

  if (!password1 || !password2) {
    return { isValid: false, errorMessage: "Please enter a password." };
  }

  if (password1 !== password2) {
    return { isValid: false, errorMessage: "Passwords do not match." };
  }

  // Additional validations can be added here using more guard clauses

  return { isValid: true };
};
