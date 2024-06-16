import { LoginForm } from "../components/LoginForm";
//import { Button } from "react-bootstrap";

import { ActionFunction, NavLink, redirect } from "react-router-dom";
//import { useNavigation } from "react-router-dom";

import { ActionRequestProps } from "../types";
import { sanitizeInput } from "../utilities/sanitizeCode";
//import { useEffect } from "react";

export function Login() {
  //const actionData = useActionData();
  //const navigate = useNavigation();
  //const navigate = useNavigate();
  //const isSubmitting = navigate.state === "submitting";
  //const { state } = useAuth();
  //const { isAuthenticated } = state;

  return (
    <div>
      <LoginForm />
      <p>
        Don't have an account? Register <NavLink to="/register">here</NavLink>
      </p>
    </div>
  );
}

/*
interface AppContext {
  login: (userId: string, email: string, password: string) => Promise<void>;
  // Other context properties/methods if needed
}*/

export const action: ActionFunction /*<AppContext>*/ =
  (appContext) =>
  async ({ request }: ActionRequestProps) => {
    const { login } = appContext as any;

    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;
    //const { email, password } = data;
    // const cleanEmail = sanitizeInput(email);
    // const cleanPassword = sanitizeInput(password);

    console.log("Form data: ", data);
    try {
      await login("testuser1@gmail.com", "ABC123");
      //await login("token", cleanEmail, cleanPassword)
      if (data?.referrer) return redirect(data?.referrer);
      return redirect("/account");
    } catch (error) {
      console.log("Login error: ", error);
      return redirect("/login");
    }
  };
