import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const register = createAsyncThunk(
  'auth/register',
  async ({ login, email, password, photo }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
        photoURL: photo,
      });

      const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        avatar: photoURL,
      };
      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const { uid, displayName, email: emailBase, photoURL } = auth.currentUser;
      const userProfile = {
        userId: uid,
        login: displayName,
        email: emailBase,
        avatar: photoURL,
      };

      return userProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await signOut(auth);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (photo, thunkAPI) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { photoURL: photo });
        const {
          uid,
          displayName,
          email: emailBase,
          photoURL,
        } = auth.currentUser;

        const userProfile = {
          userId: uid,
          login: displayName,
          email: emailBase,
          avatar: photoURL,
        };
        return userProfile;
      } catch (error) {
        thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
