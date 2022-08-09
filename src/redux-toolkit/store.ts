import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import cartReducer from './slices/cartSlice'
import { pizzasApi } from './api/pizzasApi'


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    [pizzasApi.reducerPath]: pizzasApi.reducer,
  },
  middleware: (gDM) => gDM().concat(pizzasApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch