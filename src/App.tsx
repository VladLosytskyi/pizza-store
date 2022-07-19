import { FC } from 'react'
import './scss/app.scss'
import Header from './components/Header/Header'
import Categories from './components/Categories/Categories'
import Sort from './components/Sort/Sort'
import PizzaBlock from './components/PizzaBlock/PizzaBlock'

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
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
            <PizzaBlock />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
