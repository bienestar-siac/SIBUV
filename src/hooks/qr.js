import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const processQrSlice = createSlice({
  name: "session",
  initialState: {
    data: [],
  },
  reducers: {
    setQrProcess: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { setQrProcess } = processQrSlice.actions;