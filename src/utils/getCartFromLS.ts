import { calculateTotalPrice } from './calculateTotalPrice'

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart')

  const preorderedPizzas = data ? JSON.parse(data) : []
  const totalPrice = calculateTotalPrice(preorderedPizzas)

  return { preorderedPizzas, totalPrice }
}