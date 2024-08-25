import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Booking {
  id: string;
  carId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "canceled";
}

interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
  },
});

export const { setBookings, addBooking, updateBooking, deleteBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
