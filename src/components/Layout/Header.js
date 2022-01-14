import classes from './Header.module.css'
import { Fragment } from 'react';

import mealsImage from '../../assets/meals.jpg'
import HeadCartButton from './HeaderCartButton';
const Header = (props) => {
    return (<Fragment>
        <header className={classes.header}>
            <h3>Sushi gate</h3>
            <HeadCartButton onClick={(x)=>{props.onShowCart(x)
              window.scrollTo(0, 0);
            }}>Card</HeadCartButton>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt={'a table full of delicious food!'} />
        </div>
    </Fragment>)
}
export default Header;