const REGISTER = "REGISTER";

// Define action creator
export const register = (key: string) => ({
  type: REGISTER,
  payload: { key },
});
