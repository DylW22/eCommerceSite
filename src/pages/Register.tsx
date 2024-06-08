import { RegisterForm } from "../components/RegisterForm";
import { redirect } from "react-router-dom";
export function Register() {
  return (
    <>
      <RegisterForm />
    </>
  );
}

export const action =
  (appContext) =>
  async ({ request }) => {
    const { createAccount } = appContext;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    //Registration validation

    //if valid, create account
    const { email, password } = data;
    await createAccount(email, password);
    let success = true;

    /* if (success && data?.referrer) {
      return redirect(data?.referrer);
    } else if (success) {
      return redirect("/account");
    }*/
    return redirect("/account");
  };
