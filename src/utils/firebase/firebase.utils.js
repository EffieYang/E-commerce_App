import {initializeApp} from "firebase/app";
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJUAVUG0L472cdTnaSoJ_tJtCKJ_L18lQ",
  authDomain: "e-commerce-app-3b714.firebaseapp.com",
  projectId: "e-commerce-app-3b714",
  storageBucket: "e-commerce-app-3b714.appspot.com",
  messagingSenderId: "646298639726",
  appId: "1:646298639726:web:ff29668cf1d38fd1b0b57f"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

   if(!userSnapShot.exists()) {
    const {displayName, email} = userAuth;
    const createAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
   }

  return userDocRef;
};