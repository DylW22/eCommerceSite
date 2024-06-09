import { database } from "./firebaseConfig.js";
import { ref, set } from "firebase/database";
import { OrderData } from "../types.js";

export const writeToDatabase = async (incomingData: OrderData) => {
  const dbRef = ref(database, `/transactions/${incomingData.orderId}`);
  set(dbRef, incomingData)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("Failure: ", error);
    });
};
