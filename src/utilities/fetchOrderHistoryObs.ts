import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig.ts";
export const fetchOrderHistory = async () => {
  const errors: Record<string, string> = {};
  try {
    const dbRef = ref(database, "/transactions");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return [];
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("An error occurred when fetching: ", error.message);
    } else {
      console.error("An unknown error occurred: ", error);
    }
    //errors[error.code] = error.message;
  }
  return { errors };
};
