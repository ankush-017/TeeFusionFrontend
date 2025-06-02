import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const stored = localStorage.getItem("darkTheme");
  return stored ? JSON.parse(stored) : false;
};

const initialState = {
  dark: getInitialTheme()
};

const darkTheme = createSlice({
    
  name: "Theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
      localStorage.setItem("darkTheme", JSON.stringify(state.dark));
    }
  }
});

export const { toggleTheme } = darkTheme.actions;
export default darkTheme.reducer;