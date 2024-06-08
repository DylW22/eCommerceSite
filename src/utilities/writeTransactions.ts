import { database } from "../utilities/firebaseConfig.js";
import { ref, set } from "firebase/database";
export const writeToDatabase = async (incomingData) => {
  const dbRef = ref(database, `/transactions/${incomingData.orderId}`);
  set(dbRef, incomingData)
    .then(() => {
      console.log("Success");
    })
    .catch((error) => {
      console.log("Failure");
    });
};
