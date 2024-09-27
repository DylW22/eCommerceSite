import { Container } from "react-bootstrap";
import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { useAuth } from "../context/AuthContext";

export function Account() {
  const { styles } = useDynamicBackground();
  const { state } = useAuth();

  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 72px)",
        background: `${styles}`,
      }}
      className="m-0 p-4 d-flex flex-column"
    >
      <div>
        <h1 className="fw-bold fs-1">Your account</h1>
        <h5>
          Your display name is{" "}
          {state.userData?.displayName
            ? `${state?.userData?.displayName}`
            : "not set."}
        </h5>
        <h5>Your email address: {state.userData?.email}</h5>
        <h5>Your account ID is: {state.userData?.uid}</h5>

        {state.newsletterSubscribed ? (
          <>You are subscribed to the store news letter!</>
        ) : (
          <>You are not subscribed to the store news letter.</>
        )}
      </div>
    </Container>
  );
}
