import { useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock'
import PizzaBlockPreloader from '../../components/PizzaBlock/PizzaBlockPreloader'
import { IPizza } from '../../App'

const Home = () => {
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy']
  const [currentCategory, setCurrentCategory] = useState(0)

  const sorts = ['popularity', 'price', 'alphabet']
  const [currentSort, setCurrentSort] = useState(0)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetch('https://62d909439088313935996943.mockapi.io/pizzas')
      .then(responce => responce.json())
      .then(data => {
        setPizzas(data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="container">
      <div className="content__top">
        <Categories categories={ categories }
                    currentCategory={ currentCategory }
                    setCurrentCategory={ setCurrentCategory } />
        <Sort sorts={ sorts }
              currentSort={ currentSort }
              setCurrentSort={ setCurrentSort } />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(8)].map((_, index) => <PizzaBlockPreloader key={ index } />)
            : pizzas.map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
        }
      </div>
    </div>
  )
}

export default Home