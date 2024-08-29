/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Car Interface
interface Car {
  _id: string;
  make: string;
  model: string;
  year: number;
  features: string[];
  pricing: number;
  image: string;
}

// Initial State
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

// Thunk to Fetch Cars
export const fetchCars = createAsyncThunk<Car[], void, { rejectValue: string }>(
  "cars/fetchCars",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/cars`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cars"
      );
    }
  }
);

// Thunk to Add Car
export const addCar = createAsyncThunk<Car, FormData, { rejectValue: string }>(
  "cars/addCar",
  async (carData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/cars`,
        carData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add car"
      );
    }
  }
);

// Thunk to Update Car
export const updateCar = createAsyncThunk<
  Car,
  { id: string; carData: FormData },
  { rejectValue: string }
>("cars/updateCar", async ({ id, carData }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/cars/${id}`,
      carData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update car"
    );
  }
});

// Thunk to Delete Car
export const deleteCar = createAsyncThunk<Car, string, { rejectValue: string }>(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/cars/${id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete car"
      );
    }
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    // Reducer to reset status and error state
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cars
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(
        fetchCars.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to fetch cars";
        }
      )
      // Add Car
      .addCase(addCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars.push(action.payload);
      })
      .addCase(
        addCar.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to add car";
        }
      )
      // Update Car
      .addCase(updateCar.fulfilled, (state, action: PayloadAction<Car>) => {
        const index = state.cars.findIndex(
          (car) => car._id === action.payload._id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })
      .addCase(
        updateCar.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to update car";
        }
      )
      // Delete Car
      .addCase(deleteCar.fulfilled, (state, action: PayloadAction<Car>) => {
        state.cars = state.cars.filter((car) => car._id !== action.payload._id);
      })
      .addCase(
        deleteCar.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload || "Failed to delete car";
        }
      );
  },
});

export const { resetStatus } = carSlice.actions;
export default carSlice.reducer;
