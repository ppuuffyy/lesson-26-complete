import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBtKoX3Sx_GPA_X3PCUavXoZasKNRrfmD8",
  authDomain: "crwn-db-e66f1.firebaseapp.com",
  databaseURL: "https://crwn-db-e66f1.firebaseio.com",
  projectId: "crwn-db-e66f1",
  storageBucket: "crwn-db-e66f1.appspot.com",
  messagingSenderId: "492066227811",
  appId: "1:492066227811:web:6689059146634d6e50da56",
  measurementId: "G-3EPX0K80VM"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
