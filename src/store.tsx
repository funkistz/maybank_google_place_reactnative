import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
// import GoogleScriptLoaderSlice from './features/google-script-loader/redux/GoogleScriptLoaderSlice';
import GooglePlaceSlice from '@features/google-place/redux/GooglePlaceSlice';

// combine all reducers
const reducers = combineReducers({
    googlePlace: GooglePlaceSlice,
})

export const store = configureStore({
    reducer: reducers,
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
