import firebase from 'firebase';


  const firebaseConfig = {
    apiKey: "AIzaSyAyxHDC7ar_-QT_1qodZr1JgO6pelUwQag",
    authDomain: "pingintelligence-b47b4.firebaseapp.com",
    projectId: "pingintelligence-b47b4",
    storageBucket: "pingintelligence-b47b4.appspot.com",
    messagingSenderId: "710458013000",
    appId: "1:710458013000:web:aa4e0e0fe631fad9272f7d",
    measurementId: "G-Z3QFBNBGJW"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  export default firebase;