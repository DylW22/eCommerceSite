//import { useAuth } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import {
  Form as FormRR,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export function LoginForm() {
  const actionData = useActionData();
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  //const { login, state, logout } = useAuth();
  //const { isAuthenticated } = state;
  //console.log("actionData: ", actionData);

  return (
    <Form as={FormRR} method="post" action="/login">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {isSubmitting ? "Submitting.." : "Submit"}
      </Button>
    </Form>
  );
}

export const action =
  /*(appContext) => {*/
  async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const errors = {};

    //Client-side password validation;
    /*
  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That is not an email address.";
  }
  console.log("keys: ", Object.keys(errors));
  if (Object.keys(errors).length) {
    return errors;
  }
  */
    const fakeNetwork = async (delay: number) =>
      new Promise(() => {
        setTimeout(() => {}, delay);
      });
    await fakeNetwork(2000);
    console.log("faked");
    //Login!

    //return redirect("/");
    return [10];
  };

//};
