import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
// import KPI from "./models/KPI.js";                 // only needed for initial data import
// import Product from "./models/Product.js";         // only needed for initial data import
// import Transaction from "./models/Transaction.js"; // only needed for initial data import
// import { kpis, products, transactions } from "./data/data.js";  // only needed for initial data import


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));	// alternatives = 'same origin' and 'same site'
app.use(morgan("common"));	// 'common' = Standard Apache common log output
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
// could all be in one file; structured this way as a learning example
app.use("/kpi", kpiRoutes);	// 'entry point' for kpi route
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;	// fallback to port 9000 if 'PORT' is not avalable
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,	// mongoose depreceated their previous URL parser
    useUnifiedTopology: true,	// use the MongoDB driver's new connection management engine
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();	// clear database of old data
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));