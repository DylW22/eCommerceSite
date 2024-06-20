import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFadeout } from "../../hooks/useFadeout";

interface Errors {
  [key: string]: string;
}

const SubscribeNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  //const [success, setSuccess] = useState(false);
  const { toFade, applyFade } = useFadeout(3000);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value: ", e.target.value);
    setEmail(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Submit
    e.preventDefault();
    let isValid = true;
    if (isValid) {
      console.log("Submitted!");
      setEmail("");
      applyFade();
      setErrors({});
    } else {
      setErrors((prev) => ({ ...prev, errorMessage: "Hello" }));
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="p-4 custom-gray position-relative"
      >
        <Form.Label>Enter your email address.</Form.Label>
        <Form.Control
          name="email"
          placeholder="yourname@example.com"
          value={email}
          onChange={handleChange}
        />

        <Button type="submit" className="">
          Subscribe
        </Button>
        {toFade && (
          <Form.Text className="position-absolute left-20">
            Green tick
          </Form.Text>
        )}
        {errors?.errorMessage && (
          <Form.Text className="position-absolute left-20 text-danger fw-bold">
            Error!
          </Form.Text>
        )}
      </Form>
    </>
  );
};

export default SubscribeNewsletter;
