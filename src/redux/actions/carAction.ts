import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get("/api/cars");
  return response.data;
});

export const setFilter = (filter: string, value: string | number) => ({
  type: "cars/setFilter",
  payload: { filter, value },
});
