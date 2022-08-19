import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IPizza } from '../PizzaBlock/PizzaBlock'
import classes from './AddedPizzaNotification.module.scss'

const AddedPizzaNotification: FC<IPizza> = ({ title, imageUrl, currentPrice, size, type }) => {
  return (
    <Link to="/cart" onClick={ () => toast.dismiss() } className={ classes.addedPizzaNotification }>
      <div className={ classes.image }>
        <img src={ imageUrl } alt="Pizza" />
      </div>
      <div className={ classes.text }>
        <div className={ classes.title }>{ title }</div>
        <div className={ classes.description }>{ type } crust, { size }cm</div>
      </div>
      <div className={ classes.price }>${ currentPrice }</div>
    </Link>
  )
}

export default AddedPizzaNotification