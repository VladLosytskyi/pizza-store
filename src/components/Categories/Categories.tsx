import { FC } from 'react'


interface CategoriesProps {
  categories: string[]
  currentCategory: number
  onSetCurrentCategory: (number) => void
}

const Categories: FC<CategoriesProps> = ({ categories, currentCategory, onSetCurrentCategory }) => {

  return (
    <div className="categories">
      <ul>
        { categories.map((category, index) =>
          <li className={ currentCategory === index && 'active' }
              onClick={ () => onSetCurrentCategory(index) }
              key={ index }>{ category }</li>
        ) }
      </ul>
    </div>
  )
}

export default Categories