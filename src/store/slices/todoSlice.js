import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // We'll add these later
  },
});

export const {} = todoSlice.actions;
export default todoSlice.reducer;