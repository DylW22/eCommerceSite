import { Form, Button } from "react-bootstrap";
import { Form as FormRR, useNavigation } from "react-router-dom";

export function RegisterForm() {
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";

  return (
    <>
      <Form as={FormRR} method="post">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" name="email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password1"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Reenter your password"
            name="password2"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        {/*<Form.Control name="referrer" readOnly hidden value={referrer} />*/}
        <Button variant="primary" type="submit">
          {isSubmitting ? "Submitting.." : "Submit"}
        </Button>
      </Form>
    </>
  );
}