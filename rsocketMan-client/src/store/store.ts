import {configureStore, combineReducers} from '@reduxjs/toolkit'
import connectionReducer from './slice/ConnectionSlice'
import dataDisplayReducer from './slice/DataDisplaySlice'
import fireAndForgetReducer from './slice/FireAndForgetSlice'

const rootReducer = combineReducers({
  connection: connectionReducer,
  dataDisplayReducer: dataDisplayReducer,
  fireAndForgetReducer:fireAndForgetReducer
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化检查
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {
  }
}
