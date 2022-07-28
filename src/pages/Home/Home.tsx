import { useContext, useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import PizzaBlock from '../../components/PizzaBlock/PizzaBlock'
import PizzaBlockPreloader from '../../components/PizzaBlock/PizzaBlockPreloader'
import { IPizza, SearchContext } from '../../App'

const Home = () => {
  const { search } = useContext(SearchContext)

  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy']
  const [currentCategory, setCurrentCategory] = useState(0)

  const sorts = [
    { sortName: 'popularity', sortProperty: 'rating', sortOrder: 'desc' },
    { sortName: 'price (low to high)', sortProperty: 'price', sortOrder: 'asc' },
    { sortName: 'price (high to low)', sortProperty: 'price', sortOrder: 'desc' },
    { sortName: 'alphabet', sortProperty: 'title', sortOrder: 'asc' }
  ]
  const [currentSort, setCurrentSort] = useState(sorts[0])

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const filterBy = currentCategory > 0 ? `category=${ currentCategory }&` : ''
    const sortBy = `sortBy=${ currentSort.sortProperty }&order=${ currentSort.sortOrder }`

    fetch(`https://62d909439088313935996943.mockapi.io/pizzas?${ filterBy }${ sortBy }`)
      .then(responce => responce.json())
      .then(data => {
        setPizzas(data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [currentCategory, currentSort, search])

  return (
    <div className="container">
      <div className="content__top">
        <Categories categories={ categories }
                    currentCategory={ currentCategory }
                    onSetCurrentCategory={ setCurrentCategory } />
        <Sort sorts={ sorts }
              currentSort={ currentSort }
              onSetCurrentSort={ setCurrentSort } />
      </div>
      <h2 className="content__title">All Pizzas</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(8)].map((_, index) => <PizzaBlockPreloader key={ index } />)
            : pizzas
              .filter((pizza: IPizza) => !!pizza.title.toLowerCase().includes(search.toLowerCase()))
              .map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
        }
      </div>
    </div>
  )
}

export default Home