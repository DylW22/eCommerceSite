import { Button, Row, Form } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { generateOrderDetails } from "../utilities/generateOrderDetails";
import { Form as FormRR } from "react-router-dom";
import { writeToDatabase } from "../utilities/writeTransactions"; //.js

import type { ActionFunction } from "react-router-dom";
import type { ActionRequestProps } from "../types.js";
export function Payment() {
  const { cartItems } = useShoppingCart();
  const cartItemsJSON = JSON.stringify(cartItems);
  /*
  const location = useLocation();
  const nav = useNavigate();

  
  useEffect(() => {
    if (
      location.pathname === "/payment" &&
      location?.state?.from !== "/checkout"
    ) {
      console.log("Will empty cart");
      emptyCart();
      nav("/");
    }
  }, [location?.state?.from]);
*/
  return (
    <div>
      <Row>Hello</Row>

      <Form as={FormRR} method="post">
        <Form.Control name="cartItems" readOnly hidden value={cartItemsJSON} />
        <Button type="submit">CONFIRM</Button>
      </Form>
    </div>
  );
}

export const action: ActionFunction =
  () =>
  async ({ request }: ActionRequestProps): Promise<PaymentDetails> => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData) as Record<string, string>;
    const cartItemsParsed = JSON.parse(data.cartItems);
    const order = generateOrderDetails(cartItemsParsed);
    const errors: Record<string, string> = {};
    let status: "success" | "failure" = "success";
    try {
      //Perform payment action
      //Successful?
      await writeToDatabase(order);
      status = "success";
    } catch (error: unknown) {
      status = "failure";
      if (error instanceof Error) {
        console.error("An error occurred: ", error.message);
      } else {
        console.error("An unknown error occurred: ", error);
      }

      // const errorCode = error.code;
      // const errorMessage = error.message;
      // errors[errorCode] = errorMessage;
    }
    return {
      status,
      errors,
    };
  };

type PaymentDetails = {
  status: "success" | "failure";
  errors: Record<string, string>;
};
