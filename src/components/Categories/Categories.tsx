import { useState } from 'react'

const Categories = () => {
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy']
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) =>
            <li className={ activeCategoryIndex === index ? 'active' : '' }
                onClick={ () => setActiveCategoryIndex(index) }>{ category }</li>)
        }
      </ul>
    </div>
  )
}

export default Categories