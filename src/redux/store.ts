import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import carReducer from "./carSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    car: carReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
