//import { database } from "./firebaseConfig"; //.js ext edit
//import { ref, set } from "firebase/database";
import { TransactionsData } from "../types.js";
import client from "../apolloClient";
import { ADD_TRANSACTION } from "../queries.js";

export const writeToDatabase = async (incomingData: TransactionsData) => {
  try {
    await client.mutate({
      mutation: ADD_TRANSACTION,
      variables: { transactionItem: incomingData },
    });
  } catch (error) {
    console.log(`Mutation error: `, error);
    throw new Error(`Mutation error ${error}`);
  }
};

/*export const writeToDatabase = async (incomingData: TransactionsData) => {
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
