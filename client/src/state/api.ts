import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetKpisResponse,
  GetProductsResponse,
  GetTransactionsResponse,
} from "./types";

// configure redux toolkit query:
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),  // from .env
  reducerPath: "main",  // name of reducer function (slice in redux)
  /* 'tags' are just a name that you can give to a specific collection of data 
  to control caching and invalidation behavior for re-fetching purposes. It 
  can be considered as a 'label' attached to cached data that is read after 
  a mutation, to decide whether the data should be affected by the mutation */
  // ???? api response stored in respective tag
  tagTypes: ["Kpis", "Products", "Transactions"], // 
  // create api calls:
  endpoints: (build) => ({
    // build.query = GET, build.mutation = POST
    getKpis: build.query<Array<GetKpisResponse>, void>({  // = 'useGetKpisQuery'; <GetKpisResponse> type from state/types.ts
      query: () => "kpi/kpis/", // baseUrl extension (so = http://localhost:1337/kpi/kpis)
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({  // = 'useProductsResponse'; <GetProductsResponse> type from state/types.ts
      query: () => "product/products/", // baseUrl extension (so = http://localhost:1337/product/products)
      providesTags: ["Products"],
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>, void>({  // = 'useTransactionsResponse'; <GetTransactionsResponse> type from state/types.ts
      query: () => "transaction/transactions/", // baseUrl extension (so = http://localhost:1337/transaction/transactions)
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api;