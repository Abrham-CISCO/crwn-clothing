import firebase from 'firebase/app/dist/index.esm'
import 'firebase/firestore/dist/index.esm'
import 'firebase/auth/dist/index.esm' 

const config = {
    apiKey: "AIzaSyBWQuWfbaXQer2xGzeJyIoNE_F072KX_zk",
    authDomain: "crwn-db-4fa8d.firebaseapp.com",
    projectId: "crwn-db-4fa8d",
    storageBucket: "crwn-db-4fa8d.appspot.com",
    messagingSenderId: "370400493948",
    appId: "1:370400493948:web:d976b758eac7d5549864f9",
    measurementId: "G-643X5P0DV4"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    //means create a new document on colelctionRef and return the reference to me
    //collectionRef.doc(custom_id)
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })

  //returns promise, if the operation is successful, the commit
  //function will return null
  return await batch.commit()
}

export const covertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(
    doc=> {
      const {title, items} = doc.data();
      return {
        routeName: encodeURI(title.toLowerCase()),
        id:doc.id,
        title,
        items
      }
    }
  );

  return transformedCollection.reduce((accumulator, collection)=> {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  },{})
}

firebase.initializeApp(config)
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider()
//select_account >> for the popup account select 
provider.setCustomParameters({prompt:'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;