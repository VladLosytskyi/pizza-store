import { FC } from 'react'


interface CategoriesProps {
  categories: string[]
  currentCategory: number
  setCurrentCategory: (number) => void
}

const Categories: FC<CategoriesProps> = ({ categories, currentCategory, setCurrentCategory }) => {

  return (
    <div className="categories">
      <ul>
        { categories.map((category, index) =>
          <li className={ currentCategory === index && 'active' }
              onClick={ () => setCurrentCategory(index) }
              key={ index }>{ category }</li>
        ) }
      </ul>
    </div>
  )
}

export default Categories