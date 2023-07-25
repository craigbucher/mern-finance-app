import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);	// load mongoose currency types

// schema for dailyData
const daySchema = new Schema(
  {
    date: String,
    revenue: {
      type: mongoose.Types.Currency,	// type = mongoose currency
      currency: "USD",	// set unit of currency
      get: (v) => v / 100,	// divide value by 100 (what mongoose-currency suggests)
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }	// setting to permit use of 'get'
);

// schema for monthlyData
const monthSchema = new Schema(
  {
    month: String,
    revenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    operationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    nonOperationalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
  },
  { toJSON: { getters: true } }	// setting to permit use of 'get'
);

const KPISchema = new Schema(
  {
    totalProfit: {
      type: mongoose.Types.Currency,	// type = mongoose currency
      currency: "USD",	// set unit of currency
      get: (v) => v / 100,	// divide value by 100 (mongo stores value without decimal)
    },
    totalRevenue: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    totalExpenses: {
      type: mongoose.Types.Currency,
      currency: "USD",
      get: (v) => v / 100,
    },
    expensesByCategory: {
      type: Map,	// = object, category: expense
      of: {
        type: mongoose.Types.Currency,
        currency: "USD",
        get: (v) => v / 100,
      },
    },
    monthlyData: [monthSchema],	// array of objects
    dailyData: [daySchema],
  },
  { timestamps: true, toJSON: { getters: true } }	// when created and when update
);

const KPI = mongoose.model("KPI", KPISchema);

export default KPI;