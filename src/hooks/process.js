import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const processSlice = createSlice({
  name: "session",
  initialState: {
    data: [],
    permanent: []
  },
  reducers: {
    setDataProcess: (state, action) => {
      state.data = action.payload.data;
    },
    setPermanentProcess: (state, action) => {
      state.permanent = action.payload.permanent;
    },
  },
});

export const { setDataProcess, setPermanentProcess } = processSlice.actions;