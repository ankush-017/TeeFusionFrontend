import { createSlice } from "@reduxjs/toolkit";

let parsedUser = null;
try {
  parsedUser = JSON.parse(localStorage.getItem('user'));
}
catch (e) {
  parsedUser = null;
}

const initialState = {
  isAuthenticated: !!localStorage.getItem('authToken'), // true
  user: parsedUser,
  token: localStorage.getItem('authToken') || null,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;