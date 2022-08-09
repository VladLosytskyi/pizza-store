import qs from 'qs'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Categories from '../../components/Categories/Categories'
import Sorts from '../../components/Sorts/Sorts'
import PizzaBlock, { IPizza } from '../../components/PizzaBlock/PizzaBlock'
import PizzaBlockPreloader from '../../components/PizzaBlock/PizzaBlockPreloader'
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/hooks'
import {
  selectCurrentCategory,
  selectCurrentSort,
  selectSearchValue,
  selectSorts,
  setFilters
} from '../../redux-toolkit/slices/filterSlice'
import { fetchPizzas, selectPizzas, selectStatus } from '../../redux-toolkit/slices/pizzasSlice'

const Home = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const currentCategory = useAppSelector(selectCurrentCategory)
  const sorts = useAppSelector(selectSorts)
  const currentSort = useAppSelector(selectCurrentSort)
  const pizzas = useAppSelector(selectPizzas)
  const status = useAppSelector(selectStatus)

  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()


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
    !isSearch && dispatch(fetchPizzas({
      category: currentCategory,
      sortProperty: sorts[currentSort].sortProperty,
      sortOrder: sorts[currentSort].sortOrder
    }))

    setIsSearch(false)
    window.scrollTo(0, 0)
  }, [dispatch, isSearch, searchValue, currentCategory, sorts, currentSort])
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
      {
        status === 'rejected'
          ? <div className="container container--not-found">
            <h1 className="content__title"><span>😕</span> Some Error Occured</h1>
            <p>Unfortunately, couldn't get pizzas.</p>
            <p>Please, try again later.</p>
          </div>
          : <div className="content__items">
            {
              status === 'pending'
                ? [...new Array(8)].map((_, index) => <PizzaBlockPreloader key={ index } />)
                : pizzas
                  .filter((pizza: IPizza) => !!pizza.title.toLowerCase().includes(searchValue.toLowerCase()))
                  .map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
            }
          </div>
      }
    </div>
  )
}

export default Home