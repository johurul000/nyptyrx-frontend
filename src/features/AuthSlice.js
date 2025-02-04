import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from 'js-cookie'
import { useSelector } from "react-redux"


function getCsrfToken() {
    const name = 'csrftoken'
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1)
        }
    }
    return null
}

const apiURL = process.env.REACT_APP_API_URL


export const register = createAsyncThunk(
    'auth/register',
    async({ username, email, password1, password2 }, {rejectWithValue}) => {
        const body = JSON.stringify({
            username,
            email,
            password1,
            password2
        })

        // const csrfToken = getCsrfToken()
        const csrfToken = Cookies.get('csrftoken')
        // console.log('Csrftoken:', csrfToken)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrfToken
            }
        }

        try{
            const res = await axios.post(apiURL+"auth/register/", body, config)
            console.log("Response data:", res.data)
            return res.data
        }catch (err){
            console.error("Error details:", err.response ? err.response.data : err.message)
            return rejectWithValue(err.response.data)
        }

    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async(_, thunkAPI) => {
        const token = localStorage.getItem('access')
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        try{
            const res = await axios.get(apiURL+"auth/get-user/", config)
            return res.data
        }catch(err) {
            console.error("Error details:", err.response ? err.response.data : err.message)
            return thunkAPI.rejectWithValue(err.response.data)
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async({ username, password}, thunkAPI) => {

        const body = JSON.stringify({
            username,
            password
        })


        const config = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken()
            }
        }
        try{
            const res = await axios.post(apiURL+"auth/login/", body, config)

            const data = res.data
            if (res.status === 200){
                const { dispatch } = thunkAPI
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
                dispatch(getUser())
                return data
            }
            else{
                return thunkAPI.rejectWithValue(data)
            }
        }catch(err){
            console.error("Error details:", err.response ? err.response.data : err.message)
            return thunkAPI.rejectWithValue(err.response.data)
        }

    }
)


export const refresh = createAsyncThunk(
    'auth/refresh',
    async(_, thunkAPI) => {
        const token = localStorage.getItem('refresh')
        if (token) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }

            const body = JSON.stringify({ refresh: token})

            try {
                const res = await axios.post(apiURL+"auth/token/refresh/", body, config)

                const data = res.data

                if (res.status === 200){
                    const { dispatch } = thunkAPI

                    localStorage.setItem('access', data.access)
                    localStorage.setItem('refresh', data.refresh)
                    dispatch(getUser())
                }
                return data
            }
            catch (err) {
                console.error("Error details:", err.response ? err.response.data : err.message)
                return thunkAPI.rejectWithValue(err.response.data)
            }
        }else {
            return thunkAPI.rejectWithValue('No token found')
        }
    }
)


export const verify = createAsyncThunk(
    'auth/verify',
    async(_, thunkAPI) => {
        const token = localStorage.getItem('access')
        if (token){
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const body = JSON.stringify({ token: token})

            try {
                const res = await axios.post(apiURL+"auth/token/verify/", body, config)

                const data = res.data

                if (res.status === 200){
                    const { dispatch } = thunkAPI
                    
                    dispatch(getUser())


                    // dispatch(getPharmacyDetails())
                }
                return data
                

            }catch(err) {
                const { dispatch } = thunkAPI
                await dispatch(refresh())
            }
        }else {
            return thunkAPI.rejectWithValue('No token found')
        }
    }
)

export const createPharmacy = createAsyncThunk(
    'auth/createPharmacy',
    async(formData, {thunkAPI}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access')}`, // JWT token
            },
        }

        try {
            const response = await axios.post(apiURL+"auth/create-pharmacy/", formData, config)
            // const { pharmacy_id } = response.data
            // const { dispatch } = thunkAPI
            // thunkAPI.dispatch(getPharmacyDetails());

        } catch(error){
            const errorMessage =
                error.response?.data?.detail || 'An error occurred while creating the pharmacy.'
            return thunkAPI.rejectWithValue(errorMessage)
        }
    }
)

export const getPharmacyDetails = createAsyncThunk(
    'auth/getPharmacyDetails',
    async (_, { rejectWithValue, getState }) => {
        const state = getState()
        const user = state.auth.user


        const pharmacyId = user.pharmacy
        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
        try {
            const response = await axios.get(apiURL+`auth/pharmacy-details/${pharmacyId}/`, config)
            return response.data
        } catch (error) {
            return rejectWithValue(
            error.response && error.response.data
                ? error.response.data
                : 'Failed to fetch pharmacy details'
            )
      }
    }
)

export const editPharmacy = createAsyncThunk(
    'auth/editPharmacy',
    async ({ pharmacyId, formData }, { dispatch, rejectWithValue }) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
        }
  
        // Sending the PUT request to update the pharmacy
        const response = await axios.put(apiURL + `auth/edit-pharmacy/${pharmacyId}/`, formData, config)
  
        return response.data // Returning the updated pharmacy data
      } catch (error) {
        return rejectWithValue(
          error.response && error.response.data
            ? error.response.data
            : 'Failed to update pharmacy'
        )
      }
    }
)

export const editUser = createAsyncThunk(
    'auth/editUser',
    async ({ userId, formData }, { rejectWithValue }) => {
      try {

        const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          }
          
        const response = await axios.put(apiURL+`auth/users/${userId}/edit/`, formData, config)
        
        
        return response.data
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
)



const initialState = {
    access: localStorage.getItem('access') || null,
    isAuthenticated: false,
    isLoading: true,
    user: null,
    userId: null,
    message: '',
    pharmacy: null,
    pharmacyId: null,
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem('access')
            state.access = null
            state.isAuthenticated = false
            state.user = null
            state.message = 'User has logged out'
        },
        closeAlert(state) {
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.fulfilled, (state) => {
            state.isLoading = false
            state.message = 'Registration successful'
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true
            state.message = 'Is Loading'
        })
        .addCase(register.rejected, (state) => {
            state.isLoading = false
            state.message = 'Registration Failed'
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload
            state.userId = action.payload.id
            state.pharmacyId = action.payload.pharmacy
        })
        .addCase(getUser.rejected, (state) => {
            state.message = 'Failed to get user'
        })
        .addCase(getUser.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.message = 'Login Successful'
        })
        .addCase(login.rejected, (state) => {
            state.message = "Login Failed"
            state.isLoading = false
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(refresh.fulfilled, (state) => {
            state.isAuthenticated = true
            state.message = 'Refresh successful'
        })
        .addCase(refresh.rejected, (state) => {
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            state.isAuthenticated = false
            state.message = 'Refresh Failed'
        })
        .addCase(verify.pending, (state) => {
            state.isLoading = true
        })
        .addCase(verify.fulfilled, (state) => {
            state.isAuthenticated = true
            state.isLoading = false
            state.message = 'Verification Successful'
        })
        .addCase(verify.rejected, (state) => {
            state.isLoading = false
        })
        .addCase(createPharmacy.pending, (state) => {
            state.isLoading = true
            state.error = null 
            state.message = '' 
        })
        .addCase(createPharmacy.fulfilled, (state) => {
            state.isLoading = false
            state.message = 'Pharmacy created successfully!' 
            state.error = null 
        })
        .addCase(createPharmacy.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Failed to create pharmacy.' 
            state.message = '' 
        })
        .addCase(getPharmacyDetails.pending, (state) => {
            state.isLoading = true
            state.error = null 
        })
        .addCase(getPharmacyDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.pharmacy = action.payload 
            state.error = null 
        })
        .addCase(getPharmacyDetails.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload || 'Failed to fetch pharmacy details' 
        })
        .addCase(editPharmacy.pending, (state) => {
            state.isLoading = true
            state.message = '' 
        })
        .addCase(editPharmacy.fulfilled, (state, action) => {
            state.isLoading = false
            state.pharmacy = action.payload.pharmacy
            state.message = action.payload.message
        })
        .addCase(editPharmacy.rejected, (state, action) => {
            state.isLoading = false
            state.message = action.payload || 'Failed to update pharmacy'
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload; 
            state.message = 'User updated successfully';
        })
        .addCase(editUser.pending, (state) => {
            state.isLoading = true;
            state.message = 'Updating user...';
        })
        .addCase(editUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Failed to update user';
            state.message = 'User update failed';
        });
    }
})

export const { logout, closeAlert } = authSlice.actions
export default authSlice.reducer