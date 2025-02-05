import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { fetchDashboardMetrics } from '../../features/DashboardSlice';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import FullPageLoader from '../../components/FullPageLoader';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    totalInventory,
    totalStockValue,
    outOfStock,
    expiringMedicines,
    totalInvoices,
    totalSales,
    lowStockMedicines,
    dailyEarnings,
    dailyInvoiceProcessed,
    monthlyEarning,
    monthlyInvoiceProcessed,
    weeklySales,
    weeklyRevenue,
    monthlyRevenue,
    topSellingProducts,
    lowStockMedicinesList,
    expiringMedicinesList,
    status,
    // monthlySales,
    // paidInvoices,
    // pendingInvoices,

  } = useSelector((state) => state.dashboard);

  // console.log("Low Stock Medicines List:", lowStockMedicinesList);

  useEffect(() => {
    dispatch(fetchDashboardMetrics());
  }, [dispatch]);

  // Data for Daily Sales Chart (Line Chart)
  const dailySalesData = {
    labels: weeklySales.labels,
    datasets: [
      {
        label: 'Daily Sales (₹)',
        data: weeklySales.data,
        borderColor: '#2563EB', // highlight color
        backgroundColor: 'rgba(37, 99, 235, 0.2)', // highlight with opacity
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Data for Weekly Revenue Chart (Bar Chart)
  const weeklyRevenueData = {
    labels: weeklyRevenue.labels,
    datasets: [
      {
        label: 'Weekly Revenue (₹)',
        data: weeklyRevenue.data,
        backgroundColor: '#2563EB', // highlight color
        borderRadius: 5,
      },
    ],
  };

  const monthlyRevenueData = {
    labels: monthlyRevenue.labels, // Labels from Redux
    datasets: [
        {
            label: 'Monthly Revenue (₹)',
            data: monthlyRevenue.data, // Data from Redux
            backgroundColor: '#2563EB',
            borderRadius: 5,
        },
    ],
  };

  if (status === 'loading') {
    return <FullPageLoader/>
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 bg-lightBackground dark:bg-dark text-darkText dark:text-grayText">
        {/* Header */}
        <div className="bg-gradient-to-r from-highlight to-highlightHover text-white p-6 rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Pharmacy Dashboard</h1>
            <p className="text-sm">Monitor and manage your pharmacy's operations with ease</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="bg-highlight hover:bg-highlightHover text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate('/inventory/')}
            >
              Add New Stock
            </button>
            <button
              className="bg-highlight hover:bg-highlightHover text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => navigate('/create-invoice/')}
            >
              Create Invoice
            </button>
            {/* <button className="bg-highlight hover:bg-highlightHover text-white font-bold py-2 px-4 rounded-lg">
              Update Pharmacy Details
            </button> */}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md text-center">
            <h6 className="text-gray-700 dark:text-grayText">Total Stock Value</h6>
            <h3 className="text-highlight dark:text-highlight text-2xl font-bold">₹{totalStockValue}</h3>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md text-center">
            <h6 className="text-gray-700 dark:text-grayText">Medicines in Inventory</h6>
            <h3 className="text-highlight dark:text-highlight text-2xl font-bold">{totalInventory}</h3>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md text-center">
            <h6 className="text-gray-700 dark:text-grayText">Low-Stock Alerts</h6>
            <h3 className="text-red-600 dark:text-red-600 text-2xl font-bold">{lowStockMedicines}</h3>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md text-center">
            <h6 className="text-gray-700 dark:text-grayText">Upcoming Expiry</h6>
            <h3 className="text-yellow-600 dark:text-yellow-600 text-2xl font-bold">{expiringMedicines}</h3>
          </div>
        </div>

        {/* Revenue and Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Day Sales Summary</h6>
            <p className="mb-1">
              Daily Earnings: <strong className="text-highlight dark:text-highlight">₹{dailyEarnings}</strong>
            </p>
            <p>
              Invoices Processed: <strong>{dailyInvoiceProcessed}</strong>
            </p>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Monthly Sales Summary</h6>
            <p className="mb-1">
              Monthly Earnings: <strong className="text-highlight dark:text-highlight">₹{monthlyEarning}</strong>
            </p>
            <p>
              Invoices Processed: <strong>{monthlyInvoiceProcessed}</strong>
            </p>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Revenue Summary</h6>
            <p className="mb-1">
              Total Earnings: <strong className="text-highlight dark:text-highlight">₹{totalSales}</strong>
            </p>
            <p>
              Invoices Processed: <strong>{totalInvoices}</strong>
            </p>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Daily Sales Performance</h6>
            <div className="h-48">
              <Line data={dailySalesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Weekly Revenue Distribution</h6>
            <div className="h-48">
              <Bar data={weeklyRevenueData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Monthly Revenue Distribution</h6>
            <div className="h-48">
              <Bar data={monthlyRevenueData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Top-Selling Products, Low-Stock, and Expiring Medicines */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Top-Selling Products</h6>
            <table className="w-full mt-3">
              <thead className="bg-highlight dark:bg-highlight text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Units</th>
                  <th className="p-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topSellingProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-highlightHover/10">
                        <td className="p-2">{product.medicine_name}</td>
                        <td className="p-2">{product.total_units}</td>
                        <td className="p-2">₹{product.total_revenue}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Low-Stock Medicines</h6>
            <table className="w-full mt-3">
              <thead className="bg-highlight dark:bg-highlight text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Stock</th>
                </tr>
              </thead>
              <tbody>
              {lowStockMedicinesList.length > 0 ? (
               
                  <>
                      {lowStockMedicinesList.map((medicine, index) => (
                          <tr key={index} className="hover:bg-highlightHover/10">
                              <td className="p-2">{medicine.medicine_name}</td>
                              <td className="p-2">{medicine.quantity}</td>
                          </tr>
                      ))}
                  </>
                
              ) : (
                   <p className="mt-3 text-gray-500">No low-stock medicines</p>
              )}
                    

              </tbody>
            </table>
          </div>
          <div className="bg-lightCard dark:bg-card p-6 rounded-lg shadow-md">
            <h6 className="text-gray-700 dark:text-grayText">Expiring Medicines</h6>
            <table className="w-full mt-3">
              <thead className="bg-highlight dark:bg-highlight text-white">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
              {expiringMedicinesList.length === 0 ? (
                <tr>
                  <td colSpan="2" className="p-2 text-center">No data available</td>
                </tr>
              ) : (
                expiringMedicinesList.map((medicine, index) => (
                  <tr key={index} className="hover:bg-highlightHover/10">
                    <td className="p-2">{medicine.medicine_name}</td>
                    <td className="p-2">{medicine.expiry_date}</td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;