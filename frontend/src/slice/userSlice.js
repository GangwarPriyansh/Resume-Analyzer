import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUser: (state, action) => {
      state.user = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        // Merge the existing user data with the updated fields
        state.user = {
          ...state.user,
          ...action.payload,
          // Ensure these common fields are properly mapped
          name: action.payload.name || state.user.name,
          email: action.payload.email || state.user.email,
          number: action.payload.contact || state.user.number,
          linkedin: action.payload.linkedin || state.user.linkedin,
          github: action.payload.github || state.user.github,
          photoUrl: action.payload.photoUrl || state.user.photoUrl
        };
      };
    },
  },
});

export const { setUser, clearUser,updateUserProfile } = userSlice.actions;
export default userSlice.reducer;