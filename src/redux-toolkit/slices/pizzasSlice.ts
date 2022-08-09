import axios from 'axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPizza } from '../../components/PizzaBlock/PizzaBlock'


export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async ({
           category,
           sortProperty,
           sortOrder
         }: { category: number, sortProperty: string, sortOrder: 'asc' | 'desc' }) => {
    const response = await axios.get(`https://62d909439088313935996943.mockapi.io/pizzas?${ category > 0 ? `category=${ category }&` : '' }sortBy=${ sortProperty }&order=${ sortOrder }`)
    return response.data
  }
)

interface IPizzasState {
  pizzas: IPizza[]
  status: 'pending' | 'fulfilled' | 'rejected'
}

const initialState: IPizzasState = {
  pizzas: [],
  status: 'pending'
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = []
      state.status = 'pending'
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload
      state.status = 'fulfilled'
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = []
      state.status = 'rejected'
    })
  },
})

export const {} = pizzasSlice.actions

export const selectPizzas = (state: RootState) => state.pizzas.pizzas
export const selectStatus = (state: RootState) => state.pizzas.status

export default pizzasSlice.reducer