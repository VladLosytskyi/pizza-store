import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectCategories, selectCurrentCategory, setCurrentCategory } from '../../redux/slices/categoriesSlice'


const Categories: FC = () => {
  const categories = useAppSelector(selectCategories)
  const currentCategory = useAppSelector(selectCurrentCategory)

  const dispatch = useAppDispatch()

  return (
    <div className="categories">
      <ul>
        { categories.map((category, index) =>
          <li className={ currentCategory === index && 'active' }
              onClick={ () => dispatch(setCurrentCategory(index)) }
              key={ index }>{ category }</li>
        ) }
      </ul>
    </div>
  )
}

export default Categories