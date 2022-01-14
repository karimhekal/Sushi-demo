import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import React, { useContext, useState } from 'react';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);


    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    }
    const orderHandler = () => {
        setIsCheckout(true);
    }

    const sumbitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://authentication-50462.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({ user: userData, orderedItems: cartCtx.items })
        })
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0;
    const modalActions = <div className={classes.actions}>
        <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartItems =
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    price={item.price} />
            )
            }
        </ul>

    const cartModalContent =
        <div>
            <React.Fragment>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {isCheckout && <Checkout onConfirm={sumbitOrderHandler} onCancel={props.onClose} />}
                {!isCheckout && modalActions}
            </React.Fragment>
        </div>
    const closeButtonClass = classes['button--alt']
    const isSubmittingModalContent = <p>Sending order data ...</p>
    const didSubmitModalContent = <React.Fragment><p>Successfully sent the order</p>
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>Close</button>
        </div>
    </React.Fragment>
    return (
        <Modal onClose={props.onClose} >
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}
export default Cart;