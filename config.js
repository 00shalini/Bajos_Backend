const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCPZ6r8PhcU6JIx_-qG165iQbgsWAOSlsQ",
  authDomain: "bajos-52e28.firebaseapp.com",
  projectId: "bajos-52e28",
  storageBucket: "bajos-52e28.appspot.com",
  messagingSenderId: "140253716361",
  appId: "1:140253716361:web:3fb871a233315894104b58",
  measurementId: "G-HNH43XJZ9T",
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
