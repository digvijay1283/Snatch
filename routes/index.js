const express = require("express");
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');

router.get("/", (req, res) => {
  res.render("index", { error: "" });
});

router.get('/shop', isLoggedIn, async (req, res) => {
  try {
    let products = await productModel.find();
    console.log("Products found:", products.length);
    console.log("First product:", products[0]); // Debug: see what's in the first product
    res.render("shop", { products: products, success: "", error: "" });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.render("shop", { products: [], success: "", error: "Failed to load products" });
  }
});



module.exports = router;