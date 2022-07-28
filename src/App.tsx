import { createContext, FC, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './scss/app.scss'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import NotFound from './pages/NotFound/NotFound'


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

export const SearchContext = createContext<{ search?: string, setSearch?: (search: string) => void }>({})

const App: FC = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="wrapper">
      <SearchContext.Provider value={ { search, setSearch } }>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/cart" element={ <Cart /> } />
            <Route path="/*" element={ <NotFound /> } />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  )
}

export default App