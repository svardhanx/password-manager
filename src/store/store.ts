import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/common";
import credentialsReducer from "./slices/credentials";

const store = configureStore({
  reducer: { common: commonReducer, credentials: credentialsReducer },
  devTools: true,
});

export type AppRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
