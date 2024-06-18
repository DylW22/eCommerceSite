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
  let isValid = false;
  let errorMessage: string | undefined;

  if (password1 === password2) {
    isValid = true;
  } else {
    errorMessage = "Passwords do not match.";
  }
  if (!username) {
    errorMessage = "Username issue.";
  }

  return { isValid, errorMessage };
};
