import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../Auth/AuthSlice";
import { carApi } from "./api/carApi";

// Persist configuration for the auth reducer
const persistConfig = {
  key: "auth", // The key to be used in local storage
  storage, // The storage method to be used (local storage in this case)
};

// Create a persisted reducer for auth
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [carApi.reducerPath]: carApi.reducer, // Adding the car API reducer
    auth: persistedAuthReducer, // Adding the persisted auth reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(carApi.middleware), // Adding the API middleware
});

// Types for the store's state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create and export the persistor for the store
export const persistor = persistStore(store);
