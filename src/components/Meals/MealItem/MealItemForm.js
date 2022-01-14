import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef, useState } from 'react';
const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        var enteredAmount = amountInputRef.current.value;
        enteredAmount = +enteredAmount;
        if (enteredAmount.trim === 0 || enteredAmount < 1 || enteredAmount > 5) {
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    }
    return (<form className={classes.form} onSubmit={submitHandler}>
        <Input label={"Amount"}
            ref={amountInputRef}
            input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>)
}
export default MealItemForm;