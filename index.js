const express = require("express");
const Product = require("./models/product");
const mongoose = require("mongoose");
const Cart = require("./models/cart");

const app = express();

mongoose.connect("mongodb://localhost:27017/shopping", {
  useNewUrlParser: true,
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello!",
  });
});

// Product API's
app.get("/products", async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({
    count: products.length,
    products,
  });
});

app.post("/product/create", async (req, res) => {
  const { name, author, price } = req.body;

  const product = await Product.create({
    name,
    author,
    price,
  });

  res.status(201).json({
    message: "Product created successfully",
    product,
  });
});

// Cart API's
app.get("/cart/create", async (req, res) => {
  const cart = await Cart.create({});

  res.status(201).json({
    message: "Cart created successfully",
    cart,
  });
});

app.post("/cart/add", async (req, res) => {
  const { cartId, productId } = req.body;

  await Cart.findByIdAndUpdate(cartId, {
    $push: {
      products: productId,
    },
  });

  res.status(200).json({
    message: "Product added to cart successfully",
  });
});

app.delete("/cart/remove", async (req, res) => {
  const { cartId, productId } = req.body;

  await Cart.findByIdAndUpdate(cartId, {
    $pull: {
      products: productId,
    },
  });

  res.status(200).json({
    message: "Product removed from cart successfully",
  });
});

app.post("/cartitems", async (req, res) => {
  const { cartId } = req.body;

  const cartItems = await Cart.findById(cartId);

  res.status(200).json({
    cartItems,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
