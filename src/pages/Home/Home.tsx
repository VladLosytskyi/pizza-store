import qs from 'qs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Categories from '../../components/Categories/Categories'
import Sorts from '../../components/Sorts/Sorts'
import PizzaBlock, { IPizza } from '../../components/PizzaBlock/PizzaBlock'
import PizzaBlockPreloader from '../../components/PizzaBlock/PizzaBlockPreloader'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  ISort,
  selectCurrentCategory,
  selectCurrentSort,
  selectSearchValue,
  selectSorts,
  setFilters
} from '../../redux/slices/filterSlice'

const Home = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const currentCategory = useAppSelector(selectCurrentCategory)
  const sorts = useAppSelector(selectSorts)
  const currentSort = useAppSelector(selectCurrentSort)

  const [pizzas, setPizzas] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()


  const fetchPizzas = (currentCategory: number, sorts: ISort[], currentSort: number) => {
    const filterBy = currentCategory > 0 ? `category=${ currentCategory }&` : ''
    const sortBy = `sortBy=${ sorts[currentSort].sortProperty }&order=${ sorts[currentSort].sortOrder }`

    axios
      .get(`https://62d909439088313935996943.mockapi.io/pizzas?${ filterBy }${ sortBy }`)
      .then(response => {
        setPizzas(response.data)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    if (location.search){
      const {
        search,
        category,
        sortBy,
        order
      } = qs.parse(location.search.substring(1)) as unknown as { search: string, category: number, sortBy: string, order: string }
      const currentSort = sorts.find(sort =>
        sort.sortProperty === sortBy
        && sort.sortOrder === order).id
      dispatch(setFilters({ search, category, currentSort }))
      setIsSearch(true)
    } else {
      dispatch(setFilters({ search: '', category: 0, currentSort: 0 }))
    }
  }, [dispatch, location.search, sorts])
  useEffect(() => {
    setIsLoading(true)

    !isSearch && fetchPizzas(currentCategory, sorts, currentSort)

    setIsSearch(false)
    window.scrollTo(0, 0)
  }, [isSearch, searchValue, currentCategory, sorts, currentSort])
  useEffect(() => {
    if (isMounted){
      const queryString = qs.stringify({
        search: searchValue,
        category: currentCategory,
        sortBy: sorts[currentSort].sortProperty,
        order: sorts[currentSort].sortOrder
      })
      navigate(`?${ queryString }`)
    }
    setIsMounted(true)
  }, [currentCategory, currentSort, navigate, searchValue, sorts])


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
              .filter((pizza: IPizza) => !!pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
              .map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
        }
      </div>
    </div>
  )
}

export default Home