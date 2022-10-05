const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
