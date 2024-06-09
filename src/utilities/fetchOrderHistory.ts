import { ref, get } from "firebase/database";
import { database } from "./firebaseConfig.js";
import { PastOrderCard } from "../types.js";

type ErrorsObject = {
  errors: Record<string, string>;
};

export const fetchOrderHistory = async (): Promise<
  PastOrderCard[] | ErrorsObject
> => {
  let errors: Record<string, string> = {};
  try {
    const dbRef = ref(database, "/transactions");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data as PastOrderCard[];
    } else {
      return [];
    }
  } catch (error: any) {
    errors[error.code] = error.message;
  }
  return { errors };
};
