import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

export const addComment = createAsyncThunk(
  'posts/addComment',
  async (text, { rejectWithValue }) => {
    try {
      await addDoc(collection(db, 'comments'), { ...text });
      const data = { ...text };
      return data;      
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getComments = createAsyncThunk(
  'posts/getComments',
  async (_, { rejectWithValue }) => {
    try {
      const userComments = [];
      const snapshot = await getDocs(collection(db, "comments"));
      snapshot.forEach(doc => userComments.push(doc.data()));
      return userComments;      
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
)