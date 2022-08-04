import { FC, useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { addPizza } from '../../redux/slices/cartSlice'


export interface IPizza {
  id: number
  imageUrl: string
  title: string
  prices?: number[]
  category?: number
  rating?: number
  count?: number
  currentPrice?: number
  size?: number
  type?: string
}

const PizzaBlock: FC<IPizza> = ({
                                  id,
                                  title,
                                  imageUrl,
                                  prices
                                }) => {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)

  const pizzaTypes = ['Original', 'Thin']
  const pizzaSizes = [25, 30, 35]
  const currentPrice = prices[activeSize]

  const dispatch = useAppDispatch()


  const onAddClick = () => {
    dispatch(addPizza({
      id,
      title,
      imageUrl,
      currentPrice,
      size: pizzaSizes[activeSize],
      type: pizzaTypes[activeType]
    }))
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={ imageUrl }
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{ title }</h4>
        <div className="pizza-block__selector">
          <ul>
            { pizzaTypes.map((type, index) =>
              <button className={ activeType === index ? 'active' : undefined }
                      disabled={ type === 'Thin' && activeSize === 0 }
                      onClick={ () => setActiveType(index) }
                      key={ index }>{ type }</button>
            ) }
          </ul>
          <ul>
            { pizzaSizes.map((size, index) =>
              <button className={ activeSize === index ? 'active' : undefined }
                      onClick={ () => setActiveSize(index) }
                      key={ index }>{ size } cm</button>
            ) }
          </ul>
        </div>
        <div className=" button button--outline button--add" onClick={ onAddClick }>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white" />
          </svg>
          <span>Add To Cart For <span className="pizza-block__price" style={ {
            position: 'relative',
            top: '1px',
            fontSize: '18px',
            fontWeight: 'bold'
          } }>${ currentPrice }</span></span>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock