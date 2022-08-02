import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


export interface ISort {
  id: number
  sortName: string
  sortProperty: string
  sortOrder: 'asc' | 'desc'
}

interface IFilterState {
  searchValue: string
  categories: string[]
  currentCategory: number
  sorts: ISort[]
  currentSort: number
}

const initialState: IFilterState = {
  searchValue: '',
  categories: ['All', 'Meat', 'Vegan', 'Grill', 'Spicy'],
  currentCategory: 0,
  sorts: [
    { id: 0, sortName: 'popularity', sortProperty: 'rating', sortOrder: 'desc' },
    { id: 1, sortName: 'price (low to high)', sortProperty: 'price', sortOrder: 'asc' },
    { id: 2, sortName: 'price (high to low)', sortProperty: 'price', sortOrder: 'desc' },
    { id: 3, sortName: 'alphabet', sortProperty: 'title', sortOrder: 'asc' }
  ],
  currentSort: 0
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    },
    setCurrentCategory: (state, action: PayloadAction<number>) => {
      state.currentCategory = action.payload
    },
    setCurrentSort: (state, action: PayloadAction<number>) => {
      state.currentSort = action.payload
    },
    setFilters: (state, action: PayloadAction<{
      search: string,
      category: number,
      currentSort: number
    } >) => {
      state.searchValue = action.payload.search
      state.currentCategory = +action.payload.category
      state.currentSort = +action.payload.currentSort
    }
  },
})

export const { setSearchValue, setCurrentCategory, setCurrentSort, setFilters } = filterSlice.actions

export const selectSearchValue = (state: RootState) => state.filter.searchValue
export const selectCategories = (state: RootState) => state.filter.categories
export const selectCurrentCategory = (state: RootState) => state.filter.currentCategory
export const selectSorts = (state: RootState) => state.filter.sorts
export const selectCurrentSort = (state: RootState) => state.filter.currentSort

export default filterSlice.reducer