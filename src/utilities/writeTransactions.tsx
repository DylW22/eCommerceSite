import { database } from "./firebaseConfig.js";
import { ref, set } from "firebase/database";
import { OrderData } from "../types.js";

export const writeToDatabase = async (incomingData: OrderData) => {
  const dbRef = ref(database, `/transactions/${incomingData.orderId}`);
  try {
    await set(dbRef, incomingData);
    console.log("Success");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Failure: ", error.message);
    } else {
      console.log("Unknown failure occurred: ", error);
    }
  }
};

/*export const writeToDatabase = async (incomingData: OrderData) => {
  const dbRef = ref(database, `/transactions/${incomingData.orderId}`);
  set(dbRef, incomingData)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("Failure: ", error);
    });
};
*/
