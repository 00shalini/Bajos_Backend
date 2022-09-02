const firebase = require("firebase");
const Report = require("../models/reportModel");
const firestore = firebase.firestore();

const addReport = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addReport").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getReport = async (req, res) => {
  try {
    const report = await firestore.collection("addReport");
    const data = await report.get();
    const reportArray = [];
    if (data.empty) {
      res.send(404).send("no records");
    } else {
      data.forEach((doc) => {
        const report = new Report(doc.data().cost_of_pcs, doc.data().raw_id);
        reportArray.push(report);
      });
      res.send(reportArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addReport,
  getReport,
};
