import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const viewProcessSlice = createSlice({
  name: "viewProcess",
  initialState: {
    tools: [],
    taskList: [],
    workPlan: null,
    formProcess: []
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
    setFormProcess: (state, action) => {
      state.formProcess = action.payload.formProcess;
    },
  },
});

export const { setTools, setTaskList, setWorkPlan, setFormProcess } = viewProcessSlice.actions;