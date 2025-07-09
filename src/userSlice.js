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
    clearUser: (state,action) => {
      state.user = action.null;
      state.user = action.null;
      state.token = action.null;
      state.isAuthenticated = action.false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;