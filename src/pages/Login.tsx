import { LoginForm } from "../components/login/LoginForm";
//import { Button } from "react-bootstrap";

import { NavLink, redirect } from "react-router-dom";
import type { ActionFunction } from "react-router-dom";
//import { useNavigation } from "react-router-dom";

import { ActionRequestProps, AppAction } from "../types";

import { sanitizeInput } from "../utilities/sanitizeCode";
import { measureExecutionTime } from "../utilities/measureExecutionTime";
//import { useEffect } from "react";

//https://stackoverflow.com/questions/76766824/passing-a-function-to-a-react-router-action-in-typescript
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

export const action =
  (appContext: AppAction): ActionFunction =>
  async ({ request }: ActionRequestProps) => {
    const { login } = appContext;
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;
    //const { email, password } = data;
    // const cleanEmail = sanitizeInput(email);
    // const cleanPassword = sanitizeInput(password);

    //console.log("Form data: ", data);
    try {
      await login("testuser1@gmail.com", "ABC123");
      /*await measureExecutionTime(
        async () => await login("testuser1@gmail.com", "ABC123")
      );*/

      //await login("token", cleanEmail, cleanPassword)
      if (data?.referrer) return redirect(data?.referrer);
      return redirect("/account");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Login error: ", error);
      }

      return redirect("/login");
    }
  };
