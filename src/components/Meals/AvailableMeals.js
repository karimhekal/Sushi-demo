import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];
const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://authentication-50462.firebaseio.com/meals.json');
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    price: responseData[key].price,
                    description: responseData[key].description
                })
            }
            setMeals(loadedMeals);
            console.log(loadedMeals);
            setIsLoading(false);
        }

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message)
        });
    }, [])

    if (isLoading) {
        return <section className={classes.MealsLoading}>Loading ...</section>
    }
    if (httpError) {
        return <section className={classes.MealsError}> <p>{httpError}</p> </section>

    }
    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} price={meal.price} name={meal.name} description={meal.description} />);
    return (
        <section className={classes.meals} >
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}
export default AvailableMeals;