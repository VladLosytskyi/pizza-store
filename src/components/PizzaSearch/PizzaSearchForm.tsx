import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './PizzaSearchForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSearchValue, setSearchValue } from '../../redux/slices/filterSlice'


const PizzaSearchForm: FC = () => {
  const searchValue = useAppSelector(selectSearchValue)
  const [value, setValue] = useState(searchValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  const dispatch = useAppDispatch()

  const onResetButtonClick = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = debounce((str: string) => {
    dispatch(setSearchValue(str))
  }, 250)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  useEffect(() => {
    if (!isMounted){
      setValue(searchValue)
    }
    setIsMounted(true)
  }, [searchValue])

  return (
    <div className={ classes.pizzaSearchForm }>
      <FontAwesomeIcon icon={ faSearch } className={ classes.pizzaSearchFormIcon } />
      <input ref={ inputRef }
             type="search"
             placeholder="Search Pizzas..."
             value={ value }
             onChange={ onInputChange }
             className={ !value
               ? classes.pizzaSearchFormInput
               : `${ classes.pizzaSearchFormInput } ${ classes.pizzaSearchFormInputWithReset }` } />
      {
        !!value &&
        <button onClick={ onResetButtonClick } className={ classes.pizzaSearchFormButtonReset }>
          <FontAwesomeIcon icon={ faXmark } />
        </button>
      }
    </div>
  )
}

export default PizzaSearchForm