import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGet } from "../utils/helpers";

// ✅ Fetch temple details (using temple_id stored after login)
export const fetchTemple = createAsyncThunk("temple/fetchTemple", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const temple_id = localStorage.getItem("temple_id"); // saved during login

    if (!temple_id) return rejectWithValue("No temple_id found");

    const res = await apiGet(`/temples/${temple_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data || res;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const templeSlice = createSlice({
  name: "temple",
  initialState: {
    temple: null,
    status: "idle", // "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    clearTemple: (state) => {
      state.temple = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemple.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTemple.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temple = action.payload;
      })
      .addCase(fetchTemple.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearTemple } = templeSlice.actions;
export default templeSlice.reducer;
