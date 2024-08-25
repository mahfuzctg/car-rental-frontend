import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
  users: User[];
}

const initialState: UserState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.user && state.user.id === action.payload.id) {
        state.user = action.payload;
      }
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      if (state.user && state.user.id === action.payload) {
        state.user = null;
      }
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUser, setUsers, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
