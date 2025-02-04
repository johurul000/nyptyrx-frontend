import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiURL = 'http://localhost:8000/'

export const fetchDashboardMetrics = createAsyncThunk(
    'dashboard/fetchMetrics',
    async (_, thunkAPI) => {
      try {
        const token = localStorage.getItem('access'); // Get the token from local storage
        if (!token) {
          throw new Error('No access token found');
        }
  
        const response = await axios.get(apiURL+'inventory/metrics/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data; // Return the response data
      } catch (error) {
        // Handle errors and return a rejected value
        return thunkAPI.rejectWithValue(error.response?.data || 'An error occurred');
      }
    }
  );

const initialState = {
    totalInventory: 0,
    totalStockValue: 0,
    outOfStock: 0,
    expiringMedicines: 0,
    totalInvoices: 0,
    totalSales: 0,
    lowStockMedicines: 0,
    dailyEarnings: 0,
    dailyInvoiceProcessed: 0,
    monthlyEarning: 0,
    monthlyInvoiceProcessed: 0,
    weeklySales: { labels: [], data: [] },
    weeklyRevenue: { labels: [], data: [] },
    monthlyRevenue: { labels: [], data: [] },
    topSellingProducts: [],
    lowStockMedicinesList: [],
    expiringMedicinesList: [],
    status: 'idle',
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDashboardMetrics.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const metrics = action.payload;
          state.totalInventory = metrics.total_inventory;
          state.totalStockValue = metrics.total_stock_value;
          state.outOfStock = metrics.out_of_stock;
          state.expiringMedicines = metrics.expiring_medicines;
          state.totalInvoices = metrics.total_invoices;
          state.totalSales = metrics.total_sales;
          state.lowStockMedicines = metrics.low_stock_medicines;
          state.monthlySales = metrics.monthly_sales;
          // state.paidInvoices = metrics.paid_invoices;
          // state.pendingInvoices = metrics.pending_invoices;
          state.dailyEarnings = metrics.daily_earnings
          state.dailyInvoiceProcessed = metrics.daily_invoices_processed
          state.monthlyEarning = metrics.monthly_earnings
          state.monthlyInvoiceProcessed = metrics.monthly_invoices_processed
          state.weeklySales = metrics.weekly_sales
          state.weeklyRevenue = metrics.weekly_revenue;
          state.monthlyRevenue = metrics.monthly_revenue
          state.topSellingProducts = metrics.top_selling_products || []
          state.lowStockMedicinesList = metrics.low_stock_medicines_list || []
          state.expiringMedicinesList = metrics.expiring_medicines_list || [];
        })
        .addCase(fetchDashboardMetrics.rejected, (state) => {
          state.status = 'failed';
        });
    },
  });
  
  export default dashboardSlice.reducer;