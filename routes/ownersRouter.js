const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner.model");

router.get("/", (req, res) => {
  res.send("owners page");
});

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      // owner already exists therefore we cannot create a new one
      return res
        .status(503)
        .send("you doont have permission to create a new owner");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send(createdOwner);
  });
}
router.get('/admin',function(req,res){
  res.render("createproducts", { success: "" });
})

module.exports = router;
