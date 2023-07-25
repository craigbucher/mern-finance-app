import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);		// load mongoose currency types

// mostly copied from ProductSchema:

// schema for ProductData
const TransactionSchema = new Schema(
  {
    buyer: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Types.Currency,	// type = mongoose currency
      currency: "USD",		// set unit of currency
      get: (v) => v / 100,	// divide value by 100 (mongo stores value without decimal)
    },
		// array of products:		***** LEARN MORE ABOUT THIS *****	
    productIds: [						// products related to this transaction:
      {
        type: mongoose.Schema.Types.ObjectId,		// "how to make relationships between
        ref: "Product",	// 'Transaction' model	// different models and schemes"
      },
    ],
  },
  { timestamps: true, toJSON: { getters: true } }	// setting to permit use of 'get'
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;