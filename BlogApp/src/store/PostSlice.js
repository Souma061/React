import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  totalPosts: 0,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    //set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    //clear error state
    clearError: (state) => {
      state.error = null;
    },
    // set all posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.loading = false;
      state.error = null;
    },
    // Add a new post
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.totalPosts += 1;
      state.loading = false;
      state.error = null;
    },
    // Update an existing post
    updatePost: (state, action) => {
      const index = state.posts.findIndex((post) => post.$id === action.payload.$id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost && state.currentPost.$id === action.payload.$id) {
        state.currentPost = action.payload;
      }
    },

    //Remove a post
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
      state.totalPosts -= 1;
      state.loading = false;
      state.error = null;
      if (state.currentPost && state.currentPost.$id === action.payload) {
        state.currentPost = null;
      }
    },
    // Set current post
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Clear current post
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    // set total posts
    setTotalPosts: (state, action) => {
      state.totalPosts = action.payload;
    },
    // clear all posts
    clearPosts: (state) => {
      state.posts = [];
      state.totalPosts = 0;
      state.loading = false;
      state.error = null;
      state.currentPost = null;
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setPosts,
  addPost,
  updatePost,
  deletePost,
  setCurrentPost,
  clearCurrentPost,
  setTotalPosts,
  clearPosts,
} = postSlice.actions;

export default postSlice.reducer;
