const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
