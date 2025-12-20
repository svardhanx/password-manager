import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./slices/common";

const store = configureStore({
  reducer: { common: commonReducer },
  devTools: true,
});

export type AppRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
