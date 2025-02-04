import { configureStore } from "@reduxjs/toolkit"
import authReducer from './features/AuthSlice'
import inventoryReducer from './features/InventorySlice'
import dashboardReducer from './features/DashboardSlice'

const Store = configureStore({
    reducer: {
        auth: authReducer,
        inventory: inventoryReducer,
        dashboard: dashboardReducer
    },
})

export default Store