import { useMutation } from "@tanstack/react-query";
import { setDoc, doc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/src/lib/FirebaseConfig";
import { Favorites } from "@/src/constants/Types";

const auth = FIREBASE_AUTH;
const db = FIREBASE_DB;

export const useAddToFavorite = () => {

  return useMutation({
    async mutationFn(data: Favorites) {
      if (!auth.currentUser) {
        throw new Error("User is not authenticated");
      }

      await setDoc(doc(db, "Favorites", auth.currentUser.uid), data);
    }
  });
};
