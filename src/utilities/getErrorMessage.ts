function getErrorMessage(firebaseErrorMessage: string): string {
  switch (firebaseErrorMessage) {
    case "auth/invalid-email.":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "The user account has been disabled.";
    case "auth/user-not-found":
      return "There is no user corresponding to this email.";
    case "auth/invalid-credential":
      return "The password is incorrect.";
    default:
      return "An unknown error occurred.";
  }
}

export default getErrorMessage;
