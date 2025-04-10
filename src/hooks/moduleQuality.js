import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const moduleQuality = createSlice({
  name: "viewProcess",
  initialState: {
    activitys: [],
    accreditation: []
  },
  reducers: {
    setActivitys: (state, action) => {
      state.activitys = action.payload.activitys;
    },
    setAccreditation: (state, action) => {
      state.accreditation = action.payload.accreditation;
    },
  },
});

export const { setAccreditation, setActivitys } = moduleQuality.actions;