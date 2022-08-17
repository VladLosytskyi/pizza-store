import { IPizza } from '../components/PizzaBlock/PizzaBlock'

export const calculateTotalPrice = (preorderedPizzas: IPizza[]) => preorderedPizzas.reduce(
  (sum, pizza) => Math.round((sum + (pizza.currentPrice * pizza.count) + Number.EPSILON) * 100) / 100, 0
)