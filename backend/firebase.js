import * as admin from "firebase-admin";
var serviceAccount = require("./gapp.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestoreDb = admin.firestore();

export const usersCollection = firestoreDb.collection("users");
