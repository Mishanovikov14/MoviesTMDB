import { getAuth, updateProfile, User } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const updateUser = async (
  user: User,
  userData: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string;
  }
) => {
  if (!user) {
    throw new Error("User is not authenticated");
  }

  await updateProfile(user, userData);
};

export const addProfilePhoto = async (imageUri: string) => {
  const imageData = await fetch(imageUri);
  const fileBlob = await imageData.blob();

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  const storage = getStorage();
  const storageRef = ref(storage, `profilePhotos/${user.uid}`);

  // Ulpoad files to the Firebase Storage
  await uploadBytes(storageRef, fileBlob);

  //Get link from the firebase
  const photoURL = await getDownloadURL(storageRef);

  const userInfo = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: photoURL,
  };

  await updateUser(user, userInfo);

  return userInfo;
};
