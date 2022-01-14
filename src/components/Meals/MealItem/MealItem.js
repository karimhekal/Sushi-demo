import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';
import { useContext } from 'react';
const MealItem = (props) => {
    const cartCtx =useContext(CartContext);
    let price = `${props.price.toFixed(2)} EGP`;
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id :  props.id,
            name:props.name,
            amount:amount,
            price:props.price,
        })
        // console.log(amount);
        // console.log(props.name);
    }
    return (
        <li className={classes.meal}>
            <div><h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div><div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    );
}
export default MealItem;