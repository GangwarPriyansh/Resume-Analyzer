import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  result: "",
};

const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    setAnalysisResult(state, action) {
      state.result = action.payload;
    },
    clearAnalysisResult(state) {
      state.result = "";
    },
  },
});

export const { setAnalysisResult, clearAnalysisResult } = analysisSlice.actions;
export default analysisSlice.reducer;
