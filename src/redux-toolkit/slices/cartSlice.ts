import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IPizza } from '../../components/PizzaBlock/PizzaBlock'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calculateTotalPrice } from '../../utils/calculateTotalPrice'


const { totalPrice, preorderedPizzas } = getCartFromLS()

interface ICartState {
  totalPrice: number
  preorderedPizzas: IPizza[]
}

const initialState: ICartState = {
  totalPrice,
  preorderedPizzas,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<IPizza>) => {
      const samePizza = state.preorderedPizzas.find(pizza =>
        pizza.id === action.payload.id &&
        pizza.size === action.payload.size &&
        pizza.type === action.payload.type
      )

      samePizza
        ? samePizza.count++
        : state.preorderedPizzas.push({ ...action.payload, count: 1 })

      state.totalPrice = calculateTotalPrice(state.preorderedPizzas)
    },
    removePizza: (state, action: PayloadAction<IPizza>) => {
      state.preorderedPizzas.find(pizza =>
        pizza.id === action.payload.id &&
        pizza.size === action.payload.size &&
        pizza.type === action.payload.type
      ).count--

      state.totalPrice = calculateTotalPrice(state.preorderedPizzas)
    },
    removeAllPizzasOfType: (state, action: PayloadAction<IPizza>) => {
      state.preorderedPizzas = state.preorderedPizzas.filter(pizza =>
        pizza.id !== action.payload.id ||
        pizza.size !== action.payload.size ||
        pizza.type !== action.payload.type
      )

      state.totalPrice = calculateTotalPrice(state.preorderedPizzas)
    },
    clearCart: (state) => {
      state.preorderedPizzas = []
      state.totalPrice = 0
    },
  },
})

export const { addPizza, removePizza, removeAllPizzasOfType, clearCart } = cartSlice.actions

export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectPreorderedPizzas = (state: RootState) => state.cart.preorderedPizzas
export const selectPreorderedPizzasCount = (state: RootState) => state.cart.preorderedPizzas.reduce(
  (sum, pizza) => sum + pizza.count
  , 0
)

export default cartSlice.reducer