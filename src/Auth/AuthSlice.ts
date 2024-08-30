import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export type TUser = {
  name?: string;
  phone?: string;
  _id?: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  isAuthenticated: boolean; // Add this property
};

const initialState: TAuthState = {
  user: null,
  token: null,
  isAuthenticated: false, // Initialize it to false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: TUser | null; token: string | null }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!user && !!token; // Set authentication status based on user and token
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; // Set authentication status to false on logout
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated; // Add selector for isAuthenticated
