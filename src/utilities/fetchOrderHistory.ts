import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig.ts";
export const fetchOrderHistory = async () => {
  let errors: Record<string, string> = {};
  try {
    const dbRef = ref(database, "/transactions");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return [];
    }
  } catch (error: any) {
    errors[error.code] = error.message;
  }
  return { errors };
};
