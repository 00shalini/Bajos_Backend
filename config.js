const firebase = require('firebase');
require('dotenv').config();
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const db = firebase.initializeApp(firebaseConfig);
// const addLogin = db.collection('addLogin');
// const addRawMaterial = db.collection("addRawMaterial");
// const addNewProduct = db.collection('addNewProduct');
// const addContractor = db.collection('addContractor');
// const addProductToManufacturing = db.collection('addProductToManufacturing');

module.exports = db;
// module.exports = addLogin;
// module.exports = addRawMaterial;
// module.exports = addNewProduct;
// module.exports = addContractor;
// module.exports = addProductToManufacturing;
