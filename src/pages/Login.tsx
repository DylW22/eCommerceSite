import { LoginForm } from "../components/LoginForm";
//import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import {
  NavLink,
  redirect,
  useActionData,
  useLocation,
} from "react-router-dom";
//import { useNavigation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import { useEffect } from "react";
export function Login() {
  const actionData = useActionData();
  //const navigate = useNavigation();
  const navigate = useNavigate();
  //const isSubmitting = navigate.state === "submitting";
  const { state } = useAuth();
  const { isAuthenticated } = state;

  return (
    <div>
      <LoginForm />
      <p>
        Don't have an account? Register <NavLink to="/register">here</NavLink>
      </p>
      {/*isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={() => login("12345")}>Login</Button>
      )*/}
    </div>
  );
}

export const action =
  (appContext) =>
  async ({ request }) => {
    const { login } = appContext;

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    /*
    const fakeNetwork = (delay: number) => {
      return new Promise((resolve) => setTimeout(resolve, delay));
    };

    await fakeNetwork(3000);
    */

    await login("12345", "testuser1@gmail.com", "ABC123");

    let success = true;

    if (success && data?.referrer) {
      return redirect(data?.referrer);
    } else if (success) {
      return redirect("/account");
    }
    return data;
  };
