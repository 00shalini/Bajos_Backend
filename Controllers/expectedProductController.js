const firebase = require("firebase");
const ExpectedProduct = require("../models/expectedProductModel");
const firestore = firebase.firestore();

const addExpectedProduct = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addExpectedProduct").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getExpectedProduct = async (req, res) => {
  try {
    const expectedPro = await firestore.collection(
      "addExpectedProduct"
    );
    const data = await expectedPro.get();
    const expectedProArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const expectedPro = new ExpectedProduct(
          doc.data().recieved_product,
          doc.data().recieved_raw,
          
        );
        expectedProArray.push(expectedPro);
      });
      res.send(expectedProArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// const getProductToManufacture = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const productToManufacture = await firestore
//       .collection("addProductToManufacture")
//       .doc(id);
//     const data = await productToManufacture.get();
//     if (!data.exists) {
//       res.status(404).send("raw material with given id not found");
//     } else {
//       res.send(data.data());
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// };

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
  addExpectedProduct,
  getExpectedProduct,

  // updateProduct,
  //deleteProduct
};
