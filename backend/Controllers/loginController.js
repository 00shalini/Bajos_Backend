const firebase = require("firebase");
const Login = require("../models/loginModel");
const firestore = firebase.firestore();

const addLogin = async (req, res) => {
  try {
    const data = req.body;
    await firestore.collection("addLogin").doc().set(data);
    res.status(200).send("record saved ");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getLogin = async (req, res) => {
  try {
    const id = req.body;

    const newLogin = await firestore.collection("addLogin");
    const data = await newLogin
      .where("phone_number", "==", parseInt(req.body.phone_number))
      .where("password", "==", req.body.password)
      .get();

    let user = null;

    data.forEach((item) => {
      if (item.data()) {
        user = item.data();
      }
    });

    if (!user) {
      res.status(400).send({
        authorised: false,
      });
    } else {
     
      res.send({
        authorised: true,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addLogin,
  getLogin,

  //deleteProduct
};
