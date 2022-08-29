const firebase = require("firebase");
const ProductToManufacture = require("../models/ProductToManufactureModel");
const firestore = firebase.firestore();

const addProductToManufacture = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addProductToManufacture").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductsToManufacture = async (req, res) => {
  try {
    const productToManufacture = await firestore.collection(
      "addProductToManufacture"
    );
    const data = await productToManufacture.get();
    const productToManufactureArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const productToManufacture = new ProductToManufacture(
          doc.data().qty_in_meter,
          doc.data().price_per_meter,
          doc.data().raw_id
        );
        productToManufactureArray.push(productToManufacture);
      });
      res.send(productToManufactureArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductToManufacture = async (req, res) => {
  try {
    const id = req.params.id;
    const productToManufacture = await firestore
      .collection("addProductToManufacture")
      .doc(id);
    const data = await productToManufacture.get();
    if (!data.exists) {
      res.status(404).send("raw material with given id not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const updateProduct = async (req,res) => {
//    try {
//      const id = req.params.id;
//      const data = req.body;
//      const newProduct = await firestore.collection('addNewProduct').doc(id);
//      await newProduct.update(data);
//      res.send('updated successsfully');
//    } catch(error) {
//     res.status(400).send(error.message);
//    }
// }

// const deleteProduct = async (req, res) => {
//     try {
//      const id = req.params.id;
//      await firestore.collection('addNewProduct').doc(id).delete();
//      res.send('data deleted');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
  addProductToManufacture,
  getProductsToManufacture,
  getProductToManufacture,
  // updateProduct,
  //deleteProduct
};
