import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import devoteesReducer from "./devoteesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    devotees: devoteesReducer,
  },
});
