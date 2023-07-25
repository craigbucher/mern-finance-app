import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/transactions", async (req, res) => {		// *actual* transactions route
  try {
    const transactions = await Transaction.find()		// grab Transaction object from database
      .limit(50)		// return first 50 items
      .sort({ createdOn: -1 });		// sort by latest

    res.status(200).json(transactions);		// return transactions in json format
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;