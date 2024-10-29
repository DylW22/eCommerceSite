import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useFadeout } from "../../hooks/useFadeout";
import greenTickIcon from "../../assets/green-tick.svg";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
interface Errors {
  [key: string]: string;
}

const SubscribeNewsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const { state, subscribeToNewsletter, unsubscribeNewsletter } = useAuth();
  const { toFade, applyFade } = useFadeout(3000);
  const { theme } = useTheme();

  //console.table(state);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("e.target.value: ", e.target.value);
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = true;
    console.table(state);
    subscribeToNewsletter();
    if (isValid) {
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
        {state.newsletterSubscribed ? (
          <>
            <div className="fw-bold fs-4">
              You are subscribed to our monthly newsletter. Stay tuned!
            </div>
            <span onClick={unsubscribeNewsletter} className="text-muted">
              Click here to unsubscribe
            </span>
          </>
        ) : (
          <>
            <Form.Label>
              {state?.userData?.email
                ? "Click to subscribe."
                : "Enter your email address."}
            </Form.Label>
            <Form.Control
              name="email"
              placeholder="yourname@example.com"
              value={state?.userData?.email || email}
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
          </>
        )}
      </Form>
    </>
  );
};

export default SubscribeNewsletter;
