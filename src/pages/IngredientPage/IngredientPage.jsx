import styles from './IngredientPage.module.css';
// плохо, брать список ингредиентов из store
import storage from '../../utils/data.json';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function IngredientPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const nutrientLabels = [
        { label: 'Калории, ккал', value: 'calories' },
        { label: 'Белки, г', value: 'proteins' },
        { label: 'Жиры, г', value: 'fat' },
        { label: 'Углеводы, г', value: 'carbohydrates' },
    ];

    // const selectedIngredient = storage.find((ingredient) => ingredient._id === id);
    const selectedIngredient = useSelector((state) => state.ingredients.selectedIngredient);

    // useEffect(() => {
    //     dispatch(fetchIngredientDetailsAction(id));
    // }, [dispatch, id]);

    console.log('selectedIngredient', selectedIngredient)


    if (!selectedIngredient) {
        return (
            <div className={`${styles.error}`}>
                <h1 className='text text_type_main-large mb-5 pt-10'>Oops! Ingredient not found</h1>
                <p className='text text_type_main-medium mb-4'>The page you requested does not exist</p>
                <p className='text text_type_main-medium'>check the address or try <Link to='/' className={styles.link}>homepage</Link></p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className='text text_type_main-large mb-6 mt-10'>Детали ингредиента1</h1>

                    <div className='mb-4 mt-4'>
                        <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
                    </div>

                    <div>
                        <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
                        <div className={`${styles.flex} text_color_inactive`}>
                            {nutrientLabels.map((nutrient) => (
                                <div key={nutrient.label}>
                                    <p className='text text_type_main-default text_color_inactive mb-2'>{nutrient.label}</p>
                                    <p className='text text_type_digits-default text_color_inactive'>{selectedIngredient[nutrient.value]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}