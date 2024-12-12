const mongoose = require("mongoose");
const { Schema } = mongoose;

const barcodeSchema = mongoose.Schema(
  {
    result: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Barcode = mongoose.model("Barcode", barcodeSchema);

module.exports = { Barcode };

