import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedInUser: null,
    token: null,
  },
  reducers: {
    saveSignedInUser: (state, action) => {
      state.signedInUser = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: state => {
      state.signedInUser = null;
      state.token = null;
    },
  },
});

export const {saveSignedInUser, logoutUser} = authSlice.actions;
export default authSlice.reducer;
