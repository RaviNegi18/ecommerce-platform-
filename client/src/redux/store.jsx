import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import cartSlice from "./cartSlice";
import authReducer from "./api/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "admin", "token"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items", "itemCount"],
};

const persistAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistCartReducer = persistReducer(cartPersistConfig, cartSlice);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: persistCartReducer,
    auth: persistAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
