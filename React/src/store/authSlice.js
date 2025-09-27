// features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginApi,
  forgotPasswordApi,
  verifyOtpApi,
  resetPasswordApi,
  changePasswordApi,
} from "../utils/helpers";

/**
 * 🔑 Async Thunks
 */

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, password });
      // Save tokens/roles locally
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.temple_id) localStorage.setItem("temple_id", res.temple_id);

      // Return the full response
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

// Forgot password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi({ email });
    } catch (err) {
      return rejectWithValue(err.message || "Failed to send OTP");
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      return await verifyOtpApi({ email, otp });
    } catch (err) {
      return rejectWithValue(err.message || "Invalid OTP");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi({ email, otp, newPassword });
    } catch (err) {
      return rejectWithValue(err.message || "Reset failed");
    }
  }
);

// Change password for logged-in users
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      return await changePasswordApi({ oldPassword, newPassword });
    } catch (err) {
      return rejectWithValue(err.message || "Failed to change password");
    }
  }
);

/**
 * 🔑 Slice
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    step: "login", // login | forgot | otp | reset
    loading: false,
    alert: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setAlert: (state, action) => {
      state.alert = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.step = "login";
      state.alert = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("temple_id");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.alert = { type: "success", message: action.payload.message || "Login successful" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "otp";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "reset";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
        state.step = "login";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.alert = { type: "success", message: action.payload.message };
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      });
  },
});

export const { setStep, setAlert, logout } = authSlice.actions;
export default authSlice.reducer;
