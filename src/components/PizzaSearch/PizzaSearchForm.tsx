import debounce from 'lodash.debounce'
import { ChangeEvent, FC, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './PizzaSearchForm.module.scss'
import { useAppDispatch } from '../../redux/hooks'
import { setSearchValue } from '../../redux/slices/filterSlice'


const PizzaSearchForm: FC = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

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