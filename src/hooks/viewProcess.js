import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const viewProcessSlice = createSlice({
  name: "viewProcess",
  initialState: {
    tools: [],
    taskList: [],
    workPlan: null
  },
  reducers: {
    setTools: (state, action) => {
      state.tools = action.payload.tools;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload.taskList;
    },
    setWorkPlan: (state, action) => {
      state.workPlan = action.payload.workPlan;
    },
  },
});

export const { setTools, setTaskList, setWorkPlan } = viewProcessSlice.actions;