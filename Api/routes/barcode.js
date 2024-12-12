const express = require("express");
const router = express.Router();
const { Barcode } = require("../models/Barcode");

// POST route to save the scanned barcode
router.post("/", async (req, res) => {
  try {
    const { result, userId ,name} = req.body; // Extracting 'result' and 'userId'

    // Create a new instance of the Barcode model
    const barcode = new Barcode({ result, userId ,name});

    // Save the barcode to the database
    const savedBarcode = await barcode.save();

    res.status(200).json({ insertedId: savedBarcode._id });
  } catch (error) {
    console.error("Error saving barcode:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the barcode" });
  }
});

module.exports = router;
