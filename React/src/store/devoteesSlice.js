import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet, apiPost, apiPut, apiDelete } from "../utils/helpers";

// Fetch all devotees
export const fetchDevotees = createAsyncThunk("devotees/fetchAll", async (_, { rejectWithValue }) => {
  try { return await apiGet("/devotees"); } 
  catch (err) { return rejectWithValue(err.message || "Failed to fetch devotees"); }
});

// Add devotee
export const addDevotee = createAsyncThunk("devotees/add", async (formData, { rejectWithValue }) => {
  try { return await apiPost("/devotees", formData); }
  catch (err) { return rejectWithValue(err.message || "Failed to add devotee"); }
});

// Update devotee
export const updateDevotee = createAsyncThunk("devotees/update", async ({ id, data }, { rejectWithValue }) => {
  try { return await apiPut(`/devotees/${id}`, data); }
  catch (err) { return rejectWithValue(err.message || "Failed to update devotee"); }
});

// Delete devotee
export const deleteDevotee = createAsyncThunk("devotees/delete", async (id, { rejectWithValue }) => {
  try { await apiDelete(`/devotees/${id}`); return id; }
  catch (err) { return rejectWithValue(err.message || "Failed to delete devotee"); }
});

const devoteesSlice = createSlice({
  name: "devotees",
  initialState: { list: [], loading: false, error: null, success: null, current: null },
  reducers: {
    clearAlert: state => { state.error = null; state.success = null; },
    setCurrentDevotee: (state, action) => { state.current = action.payload; },
  },
  extraReducers: builder => {
    builder
      // Fetch
      .addCase(fetchDevotees.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchDevotees.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchDevotees.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Add
      .addCase(addDevotee.fulfilled, (state, action) => { state.list.push(action.payload); state.success = "✅ Devotee added successfully!"; })
      .addCase(addDevotee.rejected, (state, action) => { state.error = action.payload; })

      // Update
      .addCase(updateDevotee.fulfilled, (state, action) => { 
        state.list = state.list.map(item => item.id === action.payload.id ? action.payload : item); 
        state.success = "✅ Devotee updated successfully!";
      })
      .addCase(updateDevotee.rejected, (state, action) => { state.error = action.payload; })

      // Delete
      .addCase(deleteDevotee.fulfilled, (state, action) => { 
        state.list = state.list.filter(item => item.id !== action.payload); 
        state.success = "✅ Devotee deleted successfully!";
      })
      .addCase(deleteDevotee.rejected, (state, action) => { state.error = action.payload; });
  },
});

export const { clearAlert, setCurrentDevotee } = devoteesSlice.actions;
export default devoteesSlice.reducer;
