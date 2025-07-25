import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    contact: "",
    email: "",
    linkedin: "",
    github: "",
    summary: "",
    education: "",
    skills: "",
    projects: "",
    experience: "",
    achievements: "",
  },
  customFields: [],
};

const resumeFormSlice = createSlice({
  name: "resumeForm",
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    addCustomField(state, action) {
      const { field, label } = action.payload;
      if (!state.formData[field]) {
        state.customFields.push({ field, label });
        state.formData[field] = "";
      }
    },
    deleteCustomField(state, action) {
      const fieldToRemove = action.payload;
      state.customFields = state.customFields.filter(f => f.field !== fieldToRemove);
      delete state.formData[fieldToRemove];
    },
    clearFormData(state) {
      Object.keys(state.formData).forEach(key => {
        state.formData[key] = "";
      });
      state.customFields = [];
    },
     setFormData: (state, action) => { // This reducer sets the entire formData
      state.formData = { ...state.formData, ...action.payload };
      // Optionally, you might want to handle customFields received from the backend here as well
      // if your backend sends them as part of the resume data.
    },
  },
});

export const {
  updateField,
  addCustomField,
  deleteCustomField,
  clearFormData,
  setFormData,
} = resumeFormSlice.actions;

export default resumeFormSlice.reducer;
