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
  user: TUser | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
      state.isAuthenticated = !!user && !!token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  (state.auth as unknown as TAuthState).isAuthenticated;
