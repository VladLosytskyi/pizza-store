import { FC } from 'react'
import { IPizza } from '../PizzaBlock/PizzaBlock'
import classes from './AddedPizzaNotification.module.scss'

const AddedPizzaNotification: FC<IPizza> = ({ title, imageUrl, currentPrice, size, type }) => {
  return (
    <div className={ classes.addedPizzaNotification }>
      <div className={ classes.image }>
        <img src={ imageUrl } alt="Pizza" />
      </div>
      <div className={ classes.text }>
        <div className={ classes.title }>{ title }</div>
        <div className={ classes.description }>{ type } crust, { size }cm</div>
      </div>
      <div className={ classes.price }>${ currentPrice }</div>
    </div>
  )
}

export default AddedPizzaNotification