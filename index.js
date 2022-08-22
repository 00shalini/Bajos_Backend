const express = require("express");
const addRawMaterial = require("./config.js");

const app = express();
app.use(express.json());

app.post("/addRawMaterial", async(req, res) => {
  const data = req.body;
  console.log(data)
  await addRawMaterial.add({data});

  res.send({ msg: "raw material added" });
});

app.get("/managerawmaterial" , async(req,res) => {
   await 
})

app.listen(3000, () => {
  console.log("listening on 3000");
});
