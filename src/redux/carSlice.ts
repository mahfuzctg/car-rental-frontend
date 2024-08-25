import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
}

interface CarState {
  cars: Car[];
  selectedCar: Car | null;
}

const initialState: CarState = {
  cars: [],
  selectedCar: null,
};

const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    selectCar: (state, action: PayloadAction<Car | null>) => {
      state.selectedCar = action.payload;
    },
  },
});

export const { setCars, selectCar } = carSlice.actions;
export default carSlice.reducer;
