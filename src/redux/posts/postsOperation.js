import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs} from 'firebase/firestore';
import { db } from '../../firebase/config';


export const addPost = createAsyncThunk(
  'posts/addPost',
  async (post, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, 'posts'), { ...post });
      const data = { ...post } 
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'posts/getUserPosts',
  async (_, { rejectWithValue }) => {
    try {
      const userPosts = [];
      const snapshot = await getDocs(collection(db, 'posts'));
      snapshot.forEach(doc => userPosts.push(doc.data()));
      return userPosts;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);