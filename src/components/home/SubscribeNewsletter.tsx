import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFadeout } from "../../hooks/useFadeout";
import greenTickIcon from "../../assets/green-tick.svg";
import { useTheme } from "../../context/ThemeContext";
interface Errors {
  [key: string]: string;
}

const SubscribeNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const { toFade, applyFade } = useFadeout(3000);
  const { theme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value: ", e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = true;
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
        className={`p-2 ${
          theme === "light" ? "custom-lightGray" : "bg-midnight text-white"
        } position-relative rounded-5 min-height-200 text-center d-flex flex-column justify-content-center align-items-center`}
      >
        <Form.Label>Enter your email address.</Form.Label>
        <Form.Control
          name="email"
          placeholder="yourname@example.com"
          value={email}
          onChange={handleChange}
          className="rounded-3"
        />

        <Button type="submit" className="w-50 my-2">
          Subscribe
        </Button>
        {toFade && (
          <Form.Text className="position-absolute bot-10">
            <div className="d-flex justify-content-center align-items-center text-center">
              <img className="px-2" height={"30px"} src={greenTickIcon} />
            </div>
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
