import { FC, useContext, useRef } from 'react'
import { Field, Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './PizzaSearchForm.module.scss'
import { SearchContext } from '../../App'


const PizzaSearchForm: FC = () => {
  const { search, setSearch } = useContext(SearchContext)
  const inputRef = useRef<HTMLInputElement>(null)

  const submit = (values, { setSubmitting }) => {
    setSearch(values.search)
    setSubmitting(false)
  }

  const onResetButtonClick = (resetForm) => {
    resetForm({ values: { search: '' } })
    inputRef.current.focus()
  }

  return (
    <Formik initialValues={ { search } } onSubmit={ submit }>
      { ({ values, isSubmitting, resetForm }) => (
        <Form className={ classes.pizzaSearchForm }>
          <FontAwesomeIcon icon={ faSearch } className={ classes.pizzaSearchFormIcon } />
          <Field innerRef={ inputRef } type="search" name="search" placeholder="Search Pizzas..." className={ !values.search
            ? classes.pizzaSearchFormInput
            : `${ classes.pizzaSearchFormInput } ${ classes.pizzaSearchFormInputWithReset }` } />
          {
            !!values.search &&
            <button onClick={ () => onResetButtonClick(resetForm) } className={ classes.pizzaSearchFormButtonNullstyle }>
              <FontAwesomeIcon icon={ faXmark } className={ classes.pizzaSearchFormButtonReset } />
            </button>
          }
          <button type="submit" disabled={ isSubmitting } className={ classes.pizzaSearchFormButton }>Search</button>
        </Form>
      ) }
    </Formik>
  )
}

export default PizzaSearchForm