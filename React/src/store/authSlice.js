// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginApi, forgotPasswordApi, verifyOtpApi, resetPasswordApi } from "../utils/helpers";

// // Async thunks
// export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
//   try {
//     const res = await loginApi({ email, password });
//     localStorage.setItem("token", res.token);
//     localStorage.setItem("role", res.role);
//     localStorage.setItem("temple_id", res.temple_id);
//     return res;
//   } catch (err) {
//     return rejectWithValue(err.message || "Login failed");
//   }
// });

// export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
//   try {
//     const res = await forgotPasswordApi({ email });
//     return res;
//   } catch (err) {
//     return rejectWithValue(err.message || "Failed to send OTP");
//   }
// });

// export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ email, otp }, { rejectWithValue }) => {
//   try {
//     const res = await verifyOtpApi({ email, otp });
//     return res;
//   } catch (err) {
//     return rejectWithValue(err.message || "Invalid OTP");
//   }
// });

// export const resetPassword = createAsyncThunk("auth/resetPassword", async ({ email, otp, newPassword }, { rejectWithValue }) => {
//   try {
//     const res = await resetPasswordApi({ email, otp, newPassword });
//     return res;
//   } catch (err) {
//     return rejectWithValue(err.message || "Reset failed");
//   }
// });

// // Slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     step: "login", // login | forgot | otp | reset
//     loading: false,
//     alert: null,
//     user: null,
//   },
//   reducers: {
//     setStep: (state, action) => { state.step = action.payload; },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("role");
//       localStorage.removeItem("temple_id");
//       state.step = "login";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => { state.loading = true; state.alert = null; })
//       .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.alert = { type: "success", message: action.payload.message }; })
//       .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.alert = { type: "error", message: action.payload }; })

//       .addCase(forgotPassword.pending, (state) => { state.loading = true; state.alert = null; })
//       .addCase(forgotPassword.fulfilled, (state, action) => { state.loading = false; state.alert = { type: "success", message: action.payload.message }; state.step = "otp"; })
//       .addCase(forgotPassword.rejected, (state, action) => { state.loading = false; state.alert = { type: "error", message: action.payload }; })

//       .addCase(verifyOtp.pending, (state) => { state.loading = true; state.alert = null; })
//       .addCase(verifyOtp.fulfilled, (state, action) => { state.loading = false; state.alert = { type: "success", message: action.payload.message }; state.step = "reset"; })
//       .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.alert = { type: "error", message: action.payload }; })

//       .addCase(resetPassword.pending, (state) => { state.loading = true; state.alert = null; })
//       .addCase(resetPassword.fulfilled, (state, action) => { state.loading = false; state.alert = { type: "success", message: action.payload.message }; state.step = "login"; })
//       .addCase(resetPassword.rejected, (state, action) => { state.loading = false; state.alert = { type: "error", message: action.payload }; });
//   }
// });

// export const { setStep, logout } = authSlice.actions;
// export default authSlice.reducer;



// features/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, forgotPasswordApi, verifyOtpApi, resetPasswordApi } from "../utils/helpers";

// ✅ Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await loginApi({ email, password });
      // Example response expected: { token, role, temple_id, message, user }
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      if (res.temple_id) localStorage.setItem("temple_id", res.temple_id);
      return res;
    } catch (err) {
      return rejectWithValue(err.message || "Login failed");
    }
  }
);

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

// ✅ Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    step: "login", // login | forgot | otp | reset
    loading: false,
    alert: null,
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("temple_id");
      state.step = "login";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.alert = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.alert = { type: "success", message: action.payload.message || "Login successful" };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.alert = { type: "error", message: action.payload };
      })

      // Forgot password
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

      // Reset password
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
      });
  },
});

export const { setStep, logout } = authSlice.actions;
export default authSlice.reducer;
