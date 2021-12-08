import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth' 
const config = {
    apiKey: "AIzaSyBWQuWfbaXQer2xGzeJyIoNE_F072KX_zk",
    authDomain: "crwn-db-4fa8d.firebaseapp.com",
    projectId: "crwn-db-4fa8d",
    storageBucket: "crwn-db-4fa8d.appspot.com",
    messagingSenderId: "370400493948",
    appId: "1:370400493948:web:d976b758eac7d5549864f9",
    measurementId: "G-643X5P0DV4"
  };

firebase.initializeApp(config)
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
//select_account >> for the popup account select 
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;