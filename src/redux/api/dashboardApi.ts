import axios from "axios";

export const fetchDashboardStats = async () => {
  const response = await axios.get("/api/dashboard/stats");
  return response.data;
};
