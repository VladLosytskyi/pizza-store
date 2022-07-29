import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ICategoriesState {
  categories: string[]
  currentCategory: number
}

const initialState: ICategoriesState = {
  categories: ['All', 'Meat', 'Vegan', 'Grill', 'Spicy'],
  currentCategory: 0
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload
    },
  },
})

export const { setCurrentCategory } = categoriesSlice.actions

export const selectCategories = (state: RootState) => state.categories.categories
export const selectCurrentCategory = (state: RootState) => state.categories.currentCategory

export default categoriesSlice.reducer