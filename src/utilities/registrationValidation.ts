type validationResult = {
  isValid: boolean;
  errorMessage: string | null;
};
interface isValidRegistrationProps {
  email: string;
  password1: string;
  password2: string;
}
export const isValidRegistration = ({
  email,
  password1,
  password2,
}: isValidRegistrationProps): validationResult => {
  // Your validation logic here
  //  let isValid = false;
  // let errorMessage: string | undefined;

  if (!isValidEmail(email)) {
    return { isValid: false, errorMessage: "Username is invalid." };
  }

  if (!password1 || !password2) {
    return { isValid: false, errorMessage: "Please enter a password." };
  }

  if (!isStrongPassword(password1)) {
    return {
      isValid: false,
      errorMessage: "Password is not strong enough.",
    };
  }

  if (!doPasswordsMatch(password1, password2)) {
    return { isValid: false, errorMessage: "Passwords do not match." };
  }

  // Additional validations can be added here using more guard clauses

  return { isValid: true, errorMessage: null };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  );
};

const doPasswordsMatch = (password1: string, password2: string) => {
  return password1 === password2;
};
