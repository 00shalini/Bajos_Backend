const firebase = require("firebase");
const Product = require("../models/productModel");
const firestore = firebase.firestore();

const addNewProduct = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addNewProduct").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getNewProducts = async (req, res) => {
  try {
    const newProduct = await firestore
      .collection("addNewProduct")
      .orderBy("sr", "asc");
    const data = await newProduct.get();
    const newProductArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const newProduct = new Product(
          doc.data().name,
          doc.data().raw,
          // doc.data().rm,
          // doc.data().qty,
          doc.data().sr,
          doc.data().sku,

          doc.data().category,
          doc.id
        );
        newProductArray.push(newProduct);
      });

      res.send(newProductArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getNewProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const newProduct = await firestore.collection("addNewProduct").doc(id);
    const data = await newProduct.get();
    if (!data.exists) {
      res.status(404).send("raw material with given id not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newProduct = await firestore.collection("addNewProduct").doc(id);
    await newProduct.update(data);
    res.send("updated successsfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("addNewProduct").doc(id).delete();
    res.send("data deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addNewProduct,
  getNewProducts,
  getNewProduct,
  updateProduct,
  deleteProduct,
};
