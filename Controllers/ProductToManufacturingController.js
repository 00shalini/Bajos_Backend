const firebase = require("firebase");
const ProductToManufacturing = require("../models/ProductToManufacturingModel");
const firestore = firebase.firestore();

const addProductToManufacturing = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addProductToManufacturing").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductsToManufacturing = async (req, res) => {
  try {
    const productToManufacturing = await firestore.collection(
      "addProductToManufacturing"
    );
    const data = await productToManufacturing.get();
    const productToManufacturingArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const productToManufacturing = new ProductToManufacturing(
          doc.data().contractor,
          doc.data().product,
          doc.data().labour_cost_per_pcs,
          doc.data().cur_date,
          doc.data().raw_data,
          doc.id
        );
        productToManufacturingArray.push(productToManufacturing);
      });
      res.send(productToManufacturingArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getProductToManufacturing = async (req, res) => {
  try {
    const id = req.params.id;
    const productToManufacturing = await firestore
      .collection("addProductToManufacturing")
      .doc(id);
    const data = await productToManufacturing.get();
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
  addProductToManufacturing,
  getProductsToManufacturing,
  getProductToManufacturing,
  // updateProduct,
  //deleteProduct
};
