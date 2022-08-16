import { FC, memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux-toolkit/hooks'
import { selectCategories, selectCurrentCategory, setCurrentCategory } from '../../redux-toolkit/slices/filterSlice'


const Categories: FC = memo(() => {
  const categories = useAppSelector(selectCategories)
  const currentCategory = useAppSelector(selectCurrentCategory)

  const dispatch = useAppDispatch()

  return (
    <div className="categories">
      <ul>
        { categories.map((category, index) =>
          <li className={ currentCategory === index ? 'active' : undefined }
              onClick={ () => dispatch(setCurrentCategory(index)) }
              key={ index }>{ category }</li>
        ) }
      </ul>
    </div>
  )
})

export default Categories