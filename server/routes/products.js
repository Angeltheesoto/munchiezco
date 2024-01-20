const router = require("express").Router();
const Product = require("../models/Product");

module.exports = () => {
  // Get all product data
  router.get("/", async (req, res) => {
    try {
      const productData = await Product.find();
      res.send(productData);
    } catch (err) {
      console.error(`Could not fetch products data. ${err}`);
      res.status(500).send("Internal Server Error");
    }
  });

  // Decrement product quantity when user returns response from confirmed purchase
  router.get("/test", async (req, res) => {
    res.send("Decrement product quantity here..");
  });

  return router;
};
