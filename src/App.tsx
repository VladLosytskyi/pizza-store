import { FC } from 'react'
import './scss/app.scss'
import pizzas from './assets/pizzas.json'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'


export interface IPizza {
  id: number,
  imageUrl: string,
  title: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number
}

const App: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
            {
              pizzas.map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
