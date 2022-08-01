import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Categories from '../../components/Categories/Categories'
import Sorts from '../../components/Sorts/Sorts'
import PizzaBlock, { IPizza } from '../../components/PizzaBlock/PizzaBlock'
import PizzaBlockPreloader from '../../components/PizzaBlock/PizzaBlockPreloader'
import { SearchContext } from '../../App'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentCategory } from '../../redux/slices/categoriesSlice'
import { selectCurrentSort } from '../../redux/slices/sortsSlice'

const Home = () => {
  const { search } = useContext(SearchContext)

  const currentCategory = useAppSelector(selectCurrentCategory)
  const currentSort = useAppSelector(selectCurrentSort)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const filterBy = currentCategory > 0 ? `category=${ currentCategory }&` : ''
    const sortBy = `sortBy=${ currentSort.sortProperty }&order=${ currentSort.sortOrder }`

    axios
      .get(`https://62d909439088313935996943.mockapi.io/pizzas?${ filterBy }${ sortBy }`)
      .then(response => {
        setPizzas(response.data)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [currentCategory, currentSort, search])

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sorts />
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