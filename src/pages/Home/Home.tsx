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
import { useGetPizzasQuery } from '../../redux-toolkit/api/pizzasApi'

const Home = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const currentCategory = useAppSelector(selectCurrentCategory)
  const sorts = useAppSelector(selectSorts)
  const currentSort = useAppSelector(selectCurrentSort)

  const [pizzas, setPizzas] = useState<IPizza[]>([])
  const [isSearch, setIsSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const { data, isError } = useGetPizzasQuery({
    category: currentCategory,
    sortProperty: sorts[currentSort].sortProperty,
    sortOrder: sorts[currentSort].sortOrder
  })

  useEffect(() => {
    if (location.search){
      const {
        search,
        category,
        sortBy,
        order
      } = qs.parse(location.search.substring(1)) as unknown as { search: string, category: number, sortBy: string, order: string }
      const currentSort = sorts.find(sort => sort.sortProperty === sortBy && sort.sortOrder === order).id
      dispatch(setFilters({ search, category, currentSort }))
      setIsSearch(true)
    } else {
      dispatch(setFilters({ search: '', category: 0, currentSort: 0 }))
    }
  }, [dispatch, location.search, sorts])
  useEffect(() => {
    if(!isSearch && data){
      setPizzas(data.filter((pizza: IPizza) => !!pizza.title.toLowerCase().includes(searchValue.toLowerCase())))
      setIsLoaded(true)
    }

    setIsSearch(false)
    window.scrollTo(0, 0)
  }, [dispatch, data, isSearch, searchValue, currentCategory, sorts, currentSort])
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
      <h2 className="content__title">Pizzas</h2>
      {
        isError
          ? <div className="container container--not-found">
            <h1 className="content__title"><span>😕</span> Some Error Occured</h1>
            <p>Unfortunately, couldn't get pizzas.</p>
            <p>Please, try again later.</p>
          </div>
          : !isLoaded
            ? <div className="content__items">
              { [...new Array(8)].map((_, index) => <PizzaBlockPreloader key={ index } />) }
            </div>
            : !!pizzas.length
              ? <div className="content__items">
                {
                  pizzas.map((pizza: IPizza) => <PizzaBlock { ...pizza } key={ pizza.id } />)
                }
              </div>
              : <div className="container container--not-found">
                <h1 className="content__title"><span>😕</span> No Pizzas Found</h1>
                <p>Change search query or category and try again.</p>
              </div>
      }
    </div>
  )
}

export default Home