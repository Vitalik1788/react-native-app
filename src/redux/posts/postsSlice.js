import { createSlice } from "@reduxjs/toolkit";
import { addPost, getUserPosts } from "./postsOperation";


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: buider =>
    buider
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload,
        };
      }),
});

export const postsReducer = postsSlice.reducer;