const express = require("express");
const {
  addRawMaterial,
  getRawMaterials,
  getRawMaterial,
  updateRawMaterial,
  deleteRawMaterial,
  addRawMaterialId,
} = require("../Controllers/rawMaterialController");

const router = express.Router();

router.post("/addRawMaterial", addRawMaterial);
router.get("/rawMaterial", getRawMaterials);
router.get("/rawMaterial/:id", getRawMaterial);
//router.put('/updateRawMaterial/:id', updateRawMaterial);
router.delete("/rawMaterial/:id", deleteRawMaterial);
router.post("/rawMaterial/:id", addRawMaterialId);

module.exports = {
  routes: router,
};
