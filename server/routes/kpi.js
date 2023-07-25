import express from "express";
import KPI from "../models/KPI.js";

const router = express.Router();

router.get("/kpis", async (req, res) => {	// *actual* kpi route
  try {
    const kpis = await KPI.find();  // grab KPI object from database
    res.status(200).json(kpis); // return kpis in json format
  } catch (error) {
    res.status(404).json({ message: error.message });	//display error.message
  }
});

export default router;