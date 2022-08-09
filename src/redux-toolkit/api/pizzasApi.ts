import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPizza } from '../../components/PizzaBlock/PizzaBlock'


export const pizzasApi = createApi({
  reducerPath: 'pizzasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62d909439088313935996943.mockapi.io/pizzas'
  }),
  endpoints: (builder) => ({
    getPizzas: builder.query<IPizza[], { category: number, sortProperty: string, sortOrder: 'asc' | 'desc' }>({
      query: ({
                category,
                sortProperty,
                sortOrder
              }) => `https://62d909439088313935996943.mockapi.io/pizzas?${ category > 0 ? `category=${ category }&` : '' }sortBy=${ sortProperty }&order=${ sortOrder }`,
    }),
  }),
})


export const { useGetPizzasQuery } = pizzasApi