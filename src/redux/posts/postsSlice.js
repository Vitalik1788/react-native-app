import { createSlice } from "@reduxjs/toolkit";
import { addPost, getUserPosts } from "./postsOperation";
import { addComment, getComments } from "./commentsOperation";


const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: null,
    comments: [],
    isLoading: false,
    error: null,
  },
  extraReducers: buider =>
    buider
      .addCase(addPost.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload,
          isLoading: false,
      }
      })
      .addCase(addPost.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(addPost.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(getUserPosts.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload,
        };
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        return {
          ...state,
        comments: payload,
      }        
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        return {
          ...state,
          comments: payload,
    }
  })
});

export const postsReducer = postsSlice.reducer;