import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface Car {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
}

interface CarState {
  cars: Car[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CarState = {
  cars: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch cars
export const fetchFeaturedCars = createAsyncThunk(
  "cars/fetchFeaturedCars",
  async () => {
    const response = await axios.get("http://localhost:5000/api/cars");
    return response.data.data;
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeaturedCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeaturedCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchFeaturedCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load cars.";
      });
  },
});

export default carSlice.reducer;
