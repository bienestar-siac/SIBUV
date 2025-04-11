import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const moduleAgreements = createSlice({
  name: "viewProcess",
  initialState: {
    agreements: [],
  },
  reducers: {
    setAgreements: (state, action) => {
      state.agreements = action.payload.agreements;
    },
  },
});

export const { setAgreements } = moduleAgreements.actions;