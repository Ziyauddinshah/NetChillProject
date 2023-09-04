importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js"
);
firebase.initializeApp({
  apiKey: "AIzaSyBIn9kzYcSbWJ7IJZznyuxULN_ilBIs8i4",
  authDomain: "my-project-1537210853145.firebaseapp.com",
  projectId: "my-project-1537210853145",
  storageBucket: "my-project-1537210853145.appspot.com",
  messagingSenderId: "648803410492",
  appId: "1:648803410492:web:0e4fd906128a10c898d939",
  measurementId: "G-QSYRH0NXF0",
});

const messaging = firebase.messaging();
