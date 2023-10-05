import { createSlice } from '@reduxjs/toolkit';
import { login, logout, register, updateUser } from './authOperation';

const initialState = {
  login: '',
  email: '',
  avatar: null,
  userId: '',
  stateChange: false,
  authError: null,
  isloggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.login = payload.login;
        state.email = payload.email;
        state.userId = payload.userId;
        state.avatar = payload.avatar;
        state.isloggedIn = true;
        state.isLoading = false;
      })
      .addCase(register.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.authError = payload;
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.login = payload.login;
        state.email = payload.email;
        state.userId = payload.userId;
        state.avatar = payload.avatar;
        state.isloggedIn = true;
        state.isLoading = false;
      })
      .addCase(login.pending, (state, _) => {
        state.isLoading = true;        
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.authError = payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state, _) => {
        state.isloggedIn = false;
        state.login = '';
        state.email = '';
        state.userId = '';
        state.avatar = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.avatar = payload.avatar;
  })
});
    

export const authReducer = authSlice.reducer;
