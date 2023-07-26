import { useEffect } from 'react';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { BurgerProvider } from '../../services/BurgerContext';
import styles from './HomePage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients, selectLoading, selectError } from '../../services/reducers/ingredients';
// import { fetchIngredientsRequest } from '../../services/actions/ingredients';

export function HomePage() {
    // const dispatch = useDispatch();
    const ingredientsData = useSelector(selectIngredients);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    // useEffect(() => {
    //   dispatch(fetchIngredientsRequest());
    // }, [dispatch]);
  
    if (loading) {
      return <div className={styles.loading}>Ожидаем ответ от сервера...</div>;
    }
  
    if (error) {
      return <div className={styles.error}>Ошибка при получении данных: {error.message}</div>;
    }
    
    return (
        <main className={styles.container}>
            <BurgerIngredients ingredientsData={ingredientsData} />

            <BurgerProvider>
                <BurgerConstructor />
            </BurgerProvider>
        </main>        
    );
}