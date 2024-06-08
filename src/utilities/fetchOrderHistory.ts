import { fetchOrderHistory } from "./fetchOrderHistory";
import { ref, get, onValue } from "firebase/database";
import { database } from "./firebaseConfig.js";
import { PastOrderCard } from "../types.js";

export const fetchOrderHistory = async (): Promise<PastOrderCard[]> => {
  try {
    const dbRef = ref(database, "/transactions");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log("Fetched data successfully: ");
      return data as PastOrderCard[];
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.log("An error occurred.");
  }
};
/*export const fetchOrderHistory = async (): PastOrderCard[] => {
  const dbRef = ref(database, "/transactions/");
  let data = [];
  // Fetch data once
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log("snapshot1: ", snapshot.val());
        data = snapshot.val();
        return data;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  console.log("data2: ", data);
  return data;
  // Listen for real-time updates
  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  });
};*/
