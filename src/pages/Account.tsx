import { Container } from "react-bootstrap";
// import { useDynamicBackground } from "../hooks/useDynamicBackground";
import { useAuth } from "../context/AuthContext";

export function Account() {
  const { state, unsubscribeNewsletter, subscribeToNewsletter } = useAuth();

  return (
    <Container fluid className="m-0 p-4 d-flex flex-column flex-grow-1">
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
          <>
            You are subscribed to the store news letter! Click{" "}
            <a className="underline" onClick={unsubscribeNewsletter}>
              here
            </a>{" "}
            to unsubscribe.
          </>
        ) : (
          <>
            You are not subscribed to the store news letter. Click{" "}
            <a className="underline" onClick={subscribeToNewsletter}>
              here
            </a>{" "}
            to subscribe!
          </>
        )}
      </div>
    </Container>
  );
}
