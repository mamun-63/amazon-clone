import firebase from 'firebase'

// copied the config from the firebase site project app
const firebaseConfig = {
  apiKey: "AIzaSyB1Um7SRfeguZjmq_HsKD8SoVCGy2WK2ko",
  authDomain: "clone-3c429.firebaseapp.com",
  databaseURL: "https://clone-3c429.firebaseio.com",
  projectId: "clone-3c429",
  storageBucket: "clone-3c429.appspot.com",
  messagingSenderId: "772559150381",
  appId: "1:772559150381:web:f9b1015d073c0863e9c7a4",
  measurementId: "G-KXG6E8B81Y"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

// initialize the database
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }