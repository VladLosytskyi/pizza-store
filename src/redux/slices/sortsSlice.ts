import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface ISort {
  sortName: string
  sortProperty: string
  sortOrder: 'asc' | 'desc'
}

interface ISortState {
  sorts: ISort[]
  currentSort: ISort
}

const initialState: ISortState = {
  sorts: [
    { sortName: 'popularity', sortProperty: 'rating', sortOrder: 'desc' },
    { sortName: 'price (low to high)', sortProperty: 'price', sortOrder: 'asc' },
    { sortName: 'price (high to low)', sortProperty: 'price', sortOrder: 'desc' },
    { sortName: 'alphabet', sortProperty: 'title', sortOrder: 'asc' }
  ],
  currentSort: { sortName: 'popularity', sortProperty: 'rating', sortOrder: 'desc' }
}

export const sortsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCurrentSort: (state, action: PayloadAction<ISort>) => {
      state.currentSort = action.payload
    },
  },
})

export const { setCurrentSort } = sortsSlice.actions

export const selectSorts = (state: RootState) => state.sorts.sorts
export const selectCurrentSort = (state: RootState) => state.sorts.currentSort

export default sortsSlice.reducer