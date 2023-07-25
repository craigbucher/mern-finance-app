import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@/state/api";

// initialize redux state management:
export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },  // logic for this reducer
  middleware: (getDefault) => getDefault().concat(api.middleware),  // use api middleware
});
setupListeners(store.dispatch); // dispatch = methods to update store

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);