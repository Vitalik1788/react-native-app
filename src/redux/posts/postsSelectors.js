

export const selectPosts = state => state.posts.items;

export const selectComments = state => state.posts.comments; 

export const selectIsLoading = state => state.posts.isLoading;