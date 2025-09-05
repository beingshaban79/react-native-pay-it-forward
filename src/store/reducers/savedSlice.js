import {createSlice} from '@reduxjs/toolkit';

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: [],
  },
  reducers: {
    toggleSave: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    removeSaved: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    clearAllSaved: state => {
      state.items = [];
    },
  },
});

export const {toggleSave, clearAllSaved, removeSaved} = savedSlice.actions;
export default savedSlice.reducer;
