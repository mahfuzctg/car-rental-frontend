// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../Auth/AuthSlice";
import { carApi } from "./api/carApi";

// Persist configuration
const persistConfig = {
  key: "auth",
  storage,
};

// Create persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    [carApi.reducerPath]: carApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/REMOVE",
        ],
      },
    }).concat(carApi.middleware),
});

// Types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create and export the persistor
export const persistor = persistStore(store);
