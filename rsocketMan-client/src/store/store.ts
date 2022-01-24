import {configureStore, combineReducers} from '@reduxjs/toolkit'
import connectionReducer from './slice/ConnectionSlice'
import requestSliceReducer from './slice/RequestSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const rootReducer = combineReducers({
  connection: connectionReducer,
  requestSliceReducer: requestSliceReducer
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist: ["requestSliceReducer"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化检查
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {
  }
}
