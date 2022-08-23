import { FC, useState } from 'react'
import { useAppDispatch } from '../../redux-toolkit/hooks'
import { addPizza } from '../../redux-toolkit/slices/cartSlice'
import { toast } from 'react-toastify'
import AddedPizzaNotification from '../AddedPizzaNotification/AddedPizzaNotification'


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
  const [isGreen, setIsGreen] = useState(false)

  const pizzaTypes = ['Original', 'Thin']
  const pizzaSizes = [25, 30, 35]
  const currentPrice = prices[activeSize]

  const dispatch = useAppDispatch()


  const onAddClick = () => {
    setIsGreen(true)
    setTimeout(() => setIsGreen(false), 1000)

    toast.success(
      <AddedPizzaNotification
        id={ id }
        title={ title }
        imageUrl={ imageUrl }
        currentPrice={ currentPrice }
        size={ pizzaSizes[activeSize] }
        type={ pizzaTypes[activeType] }
      />
    )

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
        <button
          className={ !isGreen
            ? 'button button--outline button--add'
            : 'button button--added' }
          disabled={ isGreen }
          onClick={ onAddClick }>
          {
            isGreen
              ? <>
                <span className="cross" />
                <span>Added To Cart For <span className="pizza-block__price" style={ {
                  position: 'relative',
                  top: '1px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                } }>${ currentPrice }</span></span>
              </>
              : <>
                <span className="cross" />
                <span>Add To Cart For <span className="pizza-block__price" style={ {
                  position: 'relative',
                  top: '1px',
                  fontSize: '18px',
                  fontWeight: 'bold'
                } }>${ currentPrice }</span></span>
              </>
          }
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock