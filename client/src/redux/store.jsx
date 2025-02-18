import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import cartSlice from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistCartReducer = persistReducer(persistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: persistCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
