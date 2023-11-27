import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { obesApi } from './services/obesApi'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [obesApi.reducerPath]: obesApi.reducer,
    auth: authReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(obesApi.middleware),
})

setupListeners(store.dispatch)