const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
  res.send("products route");
});

router.get("/create", (req, res) => {
  res.render("createproducts", { success: "" });
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Debug logging
    // console.log("req.body:", req.body);
    // console.log("req.file:", req.file);

    // Check if req.body exists
    if (!req.body) {
      return res.status(400).send("Form data not received properly");
    }

    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).send("Name and price are required");
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).send("Image file is required");
    }

    console.log("File uploaded:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferLength: req.file.buffer ? req.file.buffer.length : 'No buffer'
    });

    let product = await productModel.create({
      img: req.file.buffer,  // Changed from 'image' to 'img' to match model
      name,
      price,
      discount: discount || 0,
      bgcolor: bgcolor || "#ffffff",
      panelcolor: panelcolor || "#000000", 
      textcolor: textcolor || "#000000"
    });

    console.log("Product created:", {
      id: product._id,
      name: product.name,
      hasImg: !!product.img,
      imgSize: product.img ? product.img.length : 'No img field'
    });

    // For now, just send success message or redirect
    res.status(201).send("Product created successfully!");
    // Alternative: res.redirect("/owners/admin");

  } catch (error) {
    console.log("Product creation error:", error);
    res.status(500).send("Error creating product: " + error.message);
  }
});

module.exports = router;
