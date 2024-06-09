import { LoginForm } from "../components/LoginForm";
//import { Button } from "react-bootstrap";

import { ActionFunction, NavLink, redirect } from "react-router-dom";
//import { useNavigation } from "react-router-dom";

import { ActionRequestProps } from "../types";
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

    await login("12345", "testuser1@gmail.com", "ABC123");

    let success = true;

    if (success && data?.referrer) {
      return redirect(data?.referrer);
    } else if (success) {
      return redirect("/account");
    }
    return data;
  };
