import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import { BurgerProvider } from '../../services/BurgerContext';
import styles from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { selectIngredients, selectLoading, selectError } from '../../services/reducers/ingredients';

export function HomePage() {
    // const ingredientsData = useSelector(selectIngredients);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    if (loading) {
      return <div className={styles.loading}>Ожидаем ответ от сервера...</div>;
    }
  
    if (error) {
      return <div className={styles.error}>Ошибка при получении данных: {error.message}</div>;
    }
    
    return (
        <main className={styles.container}>
            <BurgerIngredients />

            <BurgerProvider>
                <BurgerConstructor />
            </BurgerProvider>
        </main>        
    );
}