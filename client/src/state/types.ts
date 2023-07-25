export interface ExpensesByCategory {
  salaries: number;
  supplies: number;
  services: number;
}

// Ed determined these based on values obtained from an actual returned 
// array, viewed in console.log

export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  nonOperationalExpenses: number;
  operationalExpenses: number;
}

export interface Day {
  id: string;
  date: string;
  revenue: number;
  expenses: number;
}

// specify type for each returned value:
export interface GetKpisResponse {
  id: string;
  _id: string;
  __v: number;
  totalProfit: number;
  totalRevenue: number;
  totalExpenses: number;
  expensesByCategory: ExpensesByCategory; // type definition is above
  monthlyData: Array<Month>;  // type definition is above
  dailyData: Array<Day>;  // type definition is above
  createdAt: string;
  updatedAt: string;
}

// specify type for each returned value:
export interface GetProductsResponse {
  id: string;
  _id: string;
  __v: number;
  price: number;
  expense: number;
  transactions: Array<string>;
  createdAt: string;
  updatedAt: string;
}

// specify type for each returned value:
export interface GetTransactionsResponse {
  id: string;
  _id: string;
  __v: number;
  buyer: string;
  amount: number;
  productIds: Array<string>;
  createdAt: string;
  updatedAt: string;
}