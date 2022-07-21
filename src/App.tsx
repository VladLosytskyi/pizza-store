import { FC, useEffect, useState } from 'react'
import './scss/app.scss'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'
import Preloader from './components/common/Preloader/Preloader'


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
  const [pizzas, setPizzas] = useState([])

  useEffect(() => {
    fetch('https://62d909439088313935996943.mockapi.io/pizzas')
      .then(responce => responce.json())
      .then(data => setPizzas(data))
  }, [])

  return !!pizzas
    ? <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All Pizzas</h2>
          <div className="content__items">
            { pizzas.map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />) }
          </div>
        </div>
      </div>
    </div>
    : <Preloader />
}

export default App