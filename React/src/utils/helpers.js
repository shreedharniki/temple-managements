
// utils/helpers.js
import axios from "axios";

// ✅ Date formatter utility
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * ✅ Centralized axios instance
 * - Base URL for API
 * - Content-Type JSON by default
 * - Automatically attaches token
 */
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  //  baseURL: "https://tms.codemythought.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor → attach token

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Generic API call wrapper
export async function apiCall(url, method = "GET", data, config = {}) {
  try {
    const options = { url, method, ...config };

    // ❌ Do NOT send body for GET or DELETE
    if (data && method !== "GET" && method !== "DELETE") {
      options.data = data;
    }

    const response = await api(options);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || error.message;
  }
}

// ✅ Convenience helpers
export const apiGet = (url, config) => apiCall(url, "GET", null, config);
export const apiPost = (url, data, config) => apiCall(url, "POST", data, config);
export const apiPut = (url, data, config) => apiCall(url, "PUT", data, config);
export const apiDelete = (url, config) => apiCall(url, "DELETE", null, config);

// 🔑 Auth APIs
export const loginApi = (data) => apiPost("/login", data);
export const forgotPasswordApi = (data) => apiPost("/login/forgot-password", data);
export const verifyOtpApi = (data) => apiPost("/login/verify-otp", data);
export const resetPasswordApi = (data) => apiPost("/login/reset-password", data);


// ✅ Change password (for logged-in users)

export const changePasswordApi = (data) => apiPost("/login/change-password", data); // 👈 fixed route



export default api;
