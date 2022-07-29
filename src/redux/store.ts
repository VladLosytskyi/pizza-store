import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './slices/categoriesSlice'
import sortsReducer from './slices/sortsSlice'


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sorts: sortsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch