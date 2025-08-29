import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const committeePeaceSlice = createSlice({
  name: "commiteePeace",
  initialState: {
    data: [],
  },
  reducers: {
    setCommiteePeace: (state, action) => {
      state.data = action.payload.data;
    },
  },
});

export const { setCommiteePeace } = committeePeaceSlice.actions;