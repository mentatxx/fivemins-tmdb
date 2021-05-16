import {configureStore} from '@reduxjs/toolkit';
import {MovieDetailsSlice} from './MovieDetails/MovieDetails.store';
import {MovieListSlice} from './MovieList/MovieList.store';

export const store = configureStore({
  reducer: {
    movieList: MovieListSlice.reducer,
    movieDetails: MovieDetailsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
