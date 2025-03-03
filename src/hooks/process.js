import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const processSlice = createSlice({
  name: "session",
  initialState: {
    data: []
  },
  reducers: {
    setDataProcess: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { setDataProcess } = processSlice.actions;