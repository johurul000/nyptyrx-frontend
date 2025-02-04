import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const apiURL = process.env.REACT_APP_API_URL



export const searchMedicines = createAsyncThunk(
    "inventory/searchMedicines",
    async (query, { rejectWithValue }) => {
        const token = localStorage.getItem("access"); // Retrieve token securely
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(apiURL+`inventory/central-medicine/search?q=${query}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addMedicineToInventory = createAsyncThunk(
    'inventory/addMedicine',
    async ({ pharmacyId, medicineDetails }, { rejectWithValue }) => {
      try {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`, // Assuming token is stored here
            },
        }
        const response = await axios.post(apiURL+`inventory/add-stock/${pharmacyId}/`,medicineDetails, config);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

export const editMedicine = createAsyncThunk(
  'inventory/editMedicine',
  async ({ pharmacyId, medicineId, medicineDetails }, { rejectWithValue }) => {
    try {

      const config = {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`, // Assuming token is stored here
          },
      }
      const response = await axios.put(apiURL+`inventory/edit-medicine/${pharmacyId}/${medicineId}/`,medicineDetails, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPharmacyStock = createAsyncThunk(
    'inventory/fetchPharmacyStock',
    async (_, { rejectWithValue }) => {

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
        }

      try {
        const response = await axios.get(apiURL+`inventory/pharmacy-stock/`, config);
        return response.data; // Return the list of medicines
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          return rejectWithValue(error.response.data);
        } else {
          // Network or other error
          return rejectWithValue(error.message);
        }
      }
    }
);

export const searchPharmacyStock = createAsyncThunk(
    'inventory/searchPharmacyStock',
    async (query, { rejectWithValue }) => {
        const token = localStorage.getItem("access"); // Retrieve token securely
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get(apiURL+`inventory/pharmacy-stock/search?q=${query}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
  );

  export const createInvoice = createAsyncThunk(
    'invoices/createInvoice',
    async (invoicePayload, { rejectWithValue }) => {
        const body = JSON.stringify(invoicePayload)
        const token = localStorage.getItem("access"); // Retrieve token securely
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };
      try {
        const response = await axios.post(apiURL+`/inventory/create-invoice/`, invoicePayload, config);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
        return rejectWithValue(error.message);
      }
    }
  );

  export const fetchInvoiceByNumber = createAsyncThunk(
    'inventory/fetchInvoiceByNumber',
    async (invoiceNumber, thunkAPI) => {
      try {
        const response = await axios.get(apiURL+`/inventory/invoice/${invoiceNumber}/`);
        return response.data; // Axios automatically parses JSON responses
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || error.message || 'Invoice not found'
        );
      }
    }
  );

  export const fetchInvoices = createAsyncThunk(
    'inventory/fetchInvoices',
    async (_, { rejectWithValue }) => {

        const token = localStorage.getItem("access");
      try {
        const response = await axios.get(apiURL+'/inventory/get-invoices/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )
  


const initialState = {
    medicines: [],
    searchResults: [],
    serachStock: [],
    invoice: null,
    invoices: [],
    loading: false,
    status: "idle",
    error: null,
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        resetInvoiceState: (state) => {
            state.invoice = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(searchMedicines.pending, (state) => {
            state.status = "loading";
        })
        .addCase(searchMedicines.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.searchResults = action.payload;
        })
        .addCase(searchMedicines.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(addMedicineToInventory.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(addMedicineToInventory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.medicines.push(action.payload.data); 
        })
        .addCase(addMedicineToInventory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(editMedicine.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(editMedicine.fulfilled, (state, action) => {
          state.status = 'succeeded';
        
          const index = state.medicines.findIndex(
            (medicine) => medicine.id === action.payload.data.id
          );
        
          if (index !== -1) {
            state.medicines[index] = action.payload.data;
          }
        })
        .addCase(editMedicine.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        })
        .addCase(fetchPharmacyStock.pending, (state) => {
            state.status = 'loading';
            state.error = null; 
        })
        .addCase(fetchPharmacyStock.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.medicines = action.payload; 
        })
        .addCase(fetchPharmacyStock.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload; 
        })
        .addCase(searchPharmacyStock.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(searchPharmacyStock.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.serachStock = action.payload;
        })
        .addCase(searchPharmacyStock.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        .addCase(createInvoice.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createInvoice.fulfilled, (state, action) => {
            state.loading = false;
            state.invoice = action.payload;
        })
        .addCase(createInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchInvoiceByNumber.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchInvoiceByNumber.fulfilled, (state, action) => {
            state.loading = false;
            state.invoice = action.payload;
        })
        .addCase(fetchInvoiceByNumber.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchInvoices.pending, (state) => {
            state.loading = true
            state.status = 'loading'
        })
        .addCase(fetchInvoices.fulfilled, (state, action) => {
            state.loading = false
            state.status = 'succeeded'
            state.invoices = action.payload
        })
        .addCase(fetchInvoices.rejected, (state, action) => {
            state.loading = false
            state.status = 'failed'
            state.error = action.payload
        })

    }
})

export const { resetInvoiceState } = inventorySlice.actions

export default inventorySlice.reducer