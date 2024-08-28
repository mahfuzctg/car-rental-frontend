import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get("/api/cars"); // Replace with your API endpoint
  return response.data;
});

interface Car {
  id: number;
  type: string;
  image: string;
  price: number;
  description: string;
}

interface CarsState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: [],
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export default carsSlice.reducer;
