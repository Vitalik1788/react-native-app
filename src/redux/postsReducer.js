import { createSlice } from '@reduxjs/toolkit';

const postsReducer = createSlice({
  name: 'posts',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { changeFilter } = postsReducer.actions;
export default postsReducer.reducer;
