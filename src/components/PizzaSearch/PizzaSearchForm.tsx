import { FC, useContext } from 'react'
import { Field, Form, Formik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import classes from './PizzaSearchForm.module.scss'
import { SearchContext } from '../../App'


const PizzaSearchForm: FC = () => {
  const { search, setSearch } = useContext(SearchContext)

  const submit = (values, { setSubmitting }) => {
    setSearch(values.search)
    setSubmitting(false)
  }

  return (
    <Formik initialValues={ { search } } onSubmit={ submit }>
      { ({ values, isSubmitting }) => (
        <Form className={ classes.pizzaSearchForm }>
          <FontAwesomeIcon icon={ faSearch } className={ classes.pizzaSearchFormIcon } />
          <Field type="search" name="search" placeholder="Search Pizzas..." className={ !values.search
            ? classes.pizzaSearchFormInput
            : `${ classes.pizzaSearchFormInput } ${ classes.pizzaSearchFormInputWithReset }` } />
          {
            !!values.search &&
            <button type="reset" className={ classes.pizzaSearchFormButtonNullstyle }>
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