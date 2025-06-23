// AdminSummaryPage.jsx with Icons, Chart, and Download
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaCar, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

function AdminSummaryPage() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/admin/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };

    fetchSummary();
  }, []);

  const handleDownload = () => {
    if (!summary) return;
    const csv = [
      ["Metric", "Value"],
      ["Total Users", summary.totalUsers],
      ["Total Cars", summary.totalCars],
      ["Total Bookings", summary.totalBookings],
      ["Total Revenue", `$${summary.totalRevenue}`],
      ...summary.topCars.map(car => [
        `${car.brand} ${car.model} (Top Car)`,
        `Rented ${car.rentCount} times`
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "admin-summary.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!summary) return <p className="p-6">Loading...</p>;

  const chartData = {
    labels: summary.topCars.map(car => `${car.brand} ${car.model}`),
    datasets: [
      {
        label: "Rented Times",
        data: summary.topCars.map(car => car.rentCount),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Top Rented Cars (Bar Chart)",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard Summary</h1>
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Summary CSV
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Users" value={summary.totalUsers} icon={<FaUsers className="text-blue-500 text-2xl" />} />
        <SummaryCard title="Total Cars" value={summary.totalCars} icon={<FaCar className="text-green-500 text-2xl" />} />
        <SummaryCard title="Total Bookings" value={summary.totalBookings} icon={<FaCalendarAlt className="text-orange-500 text-2xl" />} />
        <SummaryCard title="Total Revenue" value={`$${summary.totalRevenue}`} icon={<FaDollarSign className="text-yellow-500 text-2xl" />} />
      </div>

      <div className="mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Rented Cars Chart</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Top Rented Cars</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {summary.topCars.map((car, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-bold text-gray-700">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-500">Rented {car.rentCount} times</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white border rounded-lg p-5 shadow text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <h3 className="text-sm text-gray-500 mb-1 uppercase tracking-wide">{title}</h3>
      <p className="text-2xl font-bold text-blue-700">{value}</p>
    </div>
  );
}

export default AdminSummaryPage;
