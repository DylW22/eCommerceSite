import { LoginForm } from "../components/login/LoginForm";
//import { Button } from "react-bootstrap";

import {
  NavLink,
  redirect,
  useLocation,
  useNavigation,
} from "react-router-dom";
import type { ActionFunction } from "react-router-dom";

import { ActionRequestProps, AppAction } from "../types";
import { useState } from "react";
import { sanitizeInput } from "../utilities/sanitizeCode";
//import { measureExecutionTime } from "../utilities/measureExecutionTime";

//https://stackoverflow.com/questions/76766824/passing-a-function-to-a-react-router-action-in-typescript
export function Login() {
  const location = useLocation();
  //console.log("LoginForm location: ", location);
  const [referrer] = useState(location?.state?.referrer || "");

  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  return (
    <div>
      <LoginForm isSubmitting={isSubmitting} referrer={referrer} />
      <p>
        Don&apos;t have an account? Register{" "}
        <NavLink to="/register">here</NavLink>
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
    const { email, password } = data;

    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);

    //console.log(`Clean email:`, cleanEmail);
    //console.log("typeof: ", typeof cleanEmail);
    //console.log(`Clean password:`, cleanPassword);
    try {
      //await login("testuser1@gmail.com", "ABC123");
      await login(cleanEmail, cleanPassword);
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
