import { RegisterForm } from "../components/login/RegisterForm";
import { ActionFunction, redirect, useNavigation } from "react-router-dom";
import { ActionRequestProps, RegisterAction } from "../types";
export function Register() {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  return (
    <>
      <RegisterForm isSubmitting={isSubmitting} />
    </>
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

    let isValid = false;
    if (password1 === password2) {
      isValid = true;
    }
    if (!isValid) {
      throw new Error("Invalid!!");
    }

    await createAccount(email, password1);
    //let success = true;
    return redirect("/account");
  };
};

/*
export const action: ActionFunction =
  (appContext) =>
  async ({ request }: ActionRequestProps) => {
    const { createAccount } = appContext as any;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    //Registration validation

    //if valid, create account
    const { email, password } = data;
    await createAccount(email, password);
    //let success = true;

    //  if (success && data?.referrer) {
    //   return redirect(data?.referrer);
    // } else if (success) {
    //   return redirect("/account");
    // }
    return redirect("/account");
  };
*/

//
//Viewing login action for typing
