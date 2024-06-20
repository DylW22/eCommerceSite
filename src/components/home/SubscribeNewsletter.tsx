import { useState } from "react";
import { Button, Form } from "react-bootstrap";
const SubscribeNewsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Submit
    e.preventDefault();
    console.log("Submitted!");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Enter your email address.</Form.Label>
        <Form.Control
          name="email"
          placeholder="yourname@example.com"
          value={email}
          onChange={handleChange}
        />
        <Button>Submit</Button>
        {success && <Form.Text>Green tick</Form.Text>}
      </Form>
    </>
  );
};

export default SubscribeNewsletter;
