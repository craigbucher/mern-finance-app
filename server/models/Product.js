import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);		// load mongoose currency types

// mostly cut-and-pasted from KPISchema:

const ProductSchema = new Schema(
  {
    price: {
      type: mongoose.Types.Currency,	// type = mongoose currency
      currency: "USD",		// set unit of currency
      get: (v) => v / 100,	// divide value by 100 (mongo stores value without decimal)
    },
    expense: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
		// array of transactions:     ***** LEARN MORE ABOUT THIS *****
    transactions: [		            // transactions related to this product:
      {
        type: mongoose.Schema.Types.ObjectId,					// "how to make relationships between
        ref: "Transaction",		// 'Transaction' model	// different models and schemes" 
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }	// setting to permit use of 'get'
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;