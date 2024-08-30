import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaCar, FaDollarSign } from "react-icons/fa";
import { useGetStatisticsQuery } from "../../../redux/features/booking/bookingApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TStatistics = {
  totalBookings: number;
  availableCars: number;
  totalRevenue: number;
};

const AdminOverview = () => {
  const { data: statisticsData } = useGetStatisticsQuery(undefined);
  const statistics: TStatistics = statisticsData?.data || [];

  const data = {
    labels: ["Total Bookings", "Available Cars", "Total Revenue"],
    datasets: [
      {
        label: "Statistics",
        data: [
          statistics.totalBookings,
          statistics.availableCars,
          statistics.totalRevenue,
        ],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "#e5e7eb",
          borderColor: "#e5e7eb",
        },
        ticks: {
          color: "#4b5563",
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
          borderColor: "#e5e7eb",
        },
        ticks: {
          color: "#4b5563",
        },
      },
    },
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      {/* Overview Header */}
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-6 uppercase">
        Admin Overview
        <div className="w-24 h-1 bg-red-600 mt-2 mx-auto"></div>
      </h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-8">
          {/* Card 1: Total Bookings */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform hover:scale-105 max-w-xs mx-auto">
            <div className="text-red-500 text-4xl mb-4">
              <AiOutlineCalendar />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-2">
              Total Bookings
            </h3>
            <p className="text-4xl font-bold text-red-600">
              {statistics.totalBookings}
            </p>
          </div>

          {/* Card 2: Available Cars */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform hover:scale-105 max-w-xs mx-auto">
            <div className="text-red-600 text-4xl mb-4">
              <FaCar />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-2">
              Available Cars
            </h3>
            <p className="text-4xl font-bold text-green-500">
              {statistics.availableCars}
            </p>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center transition-transform hover:scale-105 max-w-xs mx-auto">
            <div className="text-red-600 text-4xl mb-4">
              <FaDollarSign />
            </div>
            <h3 className="text-xl text-gray-700 font-semibold mb-2">
              Total Revenue
            </h3>
            <p className="text-4xl font-bold text-yellow-500">
              ${statistics.totalRevenue?.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Statistic Graph Section */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-10">
            Statistic Graph
          </h3>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
