const firebase = require("firebase");
const RawMaterial = require("../models/rawMaterialModel");
const firestore = firebase.firestore();

const addRawMaterial = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addRawMaterial").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addRawMaterialId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const rawMaterial = await firestore.collection('addRawMaterial').doc(id);
     await rawMaterial.post(data);
     res.send('updated successsfully');
   } catch(error) {
    res.status(400).send(error.message);
   }
};

const getRawMaterials = async (req, res) => {
  try {
    const rawMaterial = await firestore
      .collection("addRawMaterial")
      .orderBy("sr", "asc");
    const data = await rawMaterial.get();
    const rawMaterialArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const rawMaterial = new RawMaterial(
          doc.data().name,
          doc.data().sr,
          doc.data().rmku,
          doc.data().messure_unit,
          doc.data().qty_in_meter,
          doc.data().price_per_meter,
          doc.id
        );

        rawMaterialArray.push(rawMaterial);
      });
      res.send(rawMaterialArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getRawMaterial = async (req, res) => {
  try {
    const id = req.params.id;
    const rawMaterial = await firestore.collection("addRawMaterial").doc(id);
    const data = await rawMaterial.get();
    if (!data.exists) {
      res.status(404).send("raw material with given id not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const deleteRawMaterial = async (req, res) => {
  try {
    const id = req.params.id;
    await firestore.collection("addRawMaterial").doc(id).delete();
    res.send("data deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addRawMaterial,
  getRawMaterials,
  getRawMaterial,
  // updateRawMaterial,
  deleteRawMaterial,
  addRawMaterialId
};
