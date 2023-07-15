import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${serverUrl}/auth`, {
        method: "POST",
        credentials: "include", // Tambahkan ini untuk mengirim kredensial
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Response) {
        const message = await error.text();
        return thunkAPI.rejectWithValue({ message });
      }
      throw error;
    }
  }
);

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${serverUrl}/auth`, {
      method: "GET",
      credentials: "include", // Tambahkan ini untuk mengirim kredensial
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Response) {
      const message = await error.text();
      return thunkAPI.rejectWithValue({ message });
    }
    throw error;
  }
});

export const Logout = createAsyncThunk("user/Logout", async (_, thunkAPI) => {
  try {
    await fetch(`${serverUrl}/auth`, {
      method: "DELETE",
      credentials: "include", // Tambahkan ini untuk mengirim kredensial
    });
  } catch (error) {
    throw error;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Login User
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });

    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload.message;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
