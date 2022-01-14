
import classes from './Checkout.module.css';
import { useRef, useState } from 'react';
const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim() !== 5;
const Checkout = (props) => {
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalInputRef = useRef();
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = isFiveChar(enteredPostal)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid,
        })


        const formIsValid = enteredNameIsValid && enteredPostalIsValid && enteredStreetIsValid && enteredCityIsValid;

        if (formIsValid) {
            window.scrollTo(0, 0);
            props.onConfirm({ name: enteredName, street: enteredStreet, city: enteredCity, postalCode: enteredPostal })
        } else {
            return;
        }
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const postalControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`

    return (
        
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street' />
                {!formInputsValidity.street && <p>Please enter a valid street</p>}

            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal' />
                {!formInputsValidity.postalCode && <p>Please enter a valid postal code</p>}

            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}

            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>

        </form>
    );
};

export default Checkout;