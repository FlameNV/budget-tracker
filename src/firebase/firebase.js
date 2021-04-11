import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDdTtNmJ1WxKp3-3YXz_p0-amRnqIoGNA0",
    authDomain: "budget-tracker-6f498.firebaseapp.com",
    projectId: "budget-tracker-6f498",
    storageBucket: "budget-tracker-6f498.appspot.com",
    messagingSenderId: "492767442228",
    appId: "1:492767442228:web:7362db7a5e76157df2a161",
    measurementId: "G-HD4CP3Q56P"
};

const fire = firebase.initializeApp(firebaseConfig)
export default fire