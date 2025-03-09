import { configureStore, createSlice } from "@reduxjs/toolkit";

// Definimos un slice para manejar la sesión
export const viewProcessSlice = createSlice({
  name: "viewProcess",
  initialState: {
    tools: [],
    taskList: []
  },
  reducers: {
    setTools: (state, action) => {
      state.tools = action.payload.tools;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload.taskList;
    },
  },
});

export const { setTools, setTaskList } = viewProcessSlice.actions;