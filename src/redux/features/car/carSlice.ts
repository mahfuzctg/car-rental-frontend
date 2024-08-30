import { createSlice } from "@reduxjs/toolkit";

export type TOptions = {
  insurance: string | null;
  GPS: boolean | null;
  childSeat: boolean | null;
};

const initialState: TOptions = {
  insurance: null,
  GPS: null,
  childSeat: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setOptions: (state, action) => {
      const { insurance, GPS, childSeat } = action.payload;
      state.insurance = insurance === "" ? null : insurance;
      state.GPS = GPS;
      state.childSeat = childSeat;
    },
    resetOptions: (state) => {
      state.insurance = null;
      state.GPS = null;
      state.childSeat = null;
    },
  },
});

export const { resetOptions, setOptions } = carSlice.actions;

export default carSlice.reducer;
