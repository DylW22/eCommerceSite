//import { database } from "./firebaseConfig"; //.js ext edit
//import { ref, set } from "firebase/database";
import { OrderData } from "../types.js";
import client from "../apolloClient";
import { ADD_TRANSACTION } from "../queries.js";

export const writeToDatabase = async (incomingData: OrderData) => {
  try {
    await client.mutate({
      mutation: ADD_TRANSACTION,
      variables: { transactionItem: incomingData },
    });
  } catch (error) {
    console.log(`Mutation error: `, error);
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
