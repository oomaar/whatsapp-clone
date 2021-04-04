import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC_95W8qi2OAc3ydQA1peFADTNp6197WOo",
    authDomain: "realtime-chat-c481d.firebaseapp.com",
    projectId: "realtime-chat-c481d",
    storageBucket: "realtime-chat-c481d.appspot.com",
    messagingSenderId: "313573603122",
    appId: "1:313573603122:web:4692ad3701e98b1654892b"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    auth,
    provider,
};