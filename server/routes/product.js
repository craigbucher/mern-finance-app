import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/products", async (req, res) => {		// *actual* products route
  try {
    const products = await Product.find();	// grab Product object from database
    res.status(200).json(products);		// return products in json format
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;