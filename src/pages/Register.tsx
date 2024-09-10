import { RegisterForm } from "../components/login/RegisterForm";
import { ActionFunction, redirect, useNavigation } from "react-router-dom";
import { ActionRequestProps, RegisterAction } from "../types";
import { isValidRegistration } from "../utilities/registrationValidation";
import { Container } from "react-bootstrap";
export function Register() {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  return (
    <Container fluid style={{ height: "calc(100vh - 75px)" }}>
      <RegisterForm isSubmitting={isSubmitting} />
    </Container>
  );
}

export const action = (appContext: RegisterAction): ActionFunction => {
  return async ({ request }: ActionRequestProps) => {
    //CHECK: added return
    const { createAccount } = appContext;
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;
    //Registration validation function

    //if valid, create account
    const { email, password1, password2 } = data;

    const { isValid, errorMessage } = isValidRegistration({
      email,
      password1,
      password2,
    });
    if (!isValid) {
      return;
    }
    await createAccount(email, password1);
    //let success = true;
    return redirect("/account");
  };
};
