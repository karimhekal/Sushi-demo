import CartContext from "./cart-context";
import { useReducer } from 'react'

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (state, action) => {
    // console.log(action);

    if (action.type == 'ADD') {
        let updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
        let updatedItems = state.items;

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        let cartItem = state.items[existingCartItemIndex];
        if (cartItem) {
            const updatedItem = {
                ...cartItem,
                amount: cartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    else if (action.type == 'REMOVE') {
        let existingItemIndex = state.items.findIndex((item) => item.id === action.id)
        let updatedItem = state.items[existingItemIndex];
        let updatedTotalAmount = state.totalAmount - updatedItem.price;
        console.log(updatedTotalAmount);
        let updatedItems = state.items;
        console.log('asdasd')
        if (state.items[existingItemIndex].amount == 1) {
            console.log('only 1')
            let filteredItems = updatedItems.slice(0, existingItemIndex).concat(updatedItems.slice(existingItemIndex + 1, updatedItems.length))
            updatedItems = filteredItems;
            console.log(filteredItems);
        }
        else {
            updatedItems[existingItemIndex].amount -= 1;
            console.log('theres more')
        }


        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispachCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemToCartHandler = (item) => {
        dispachCartAction({ type: 'ADD', item: item })
        // console.log(item);
    }
    const removeItemFromCartHandler = (id) => {
        dispachCartAction({ type: 'REMOVE', id: id })

    }

    const clearCartHandler = () => {
        dispachCartAction({ type: 'CLEAR' })
    }
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    }

    return (<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>)
}

export default CartProvider;