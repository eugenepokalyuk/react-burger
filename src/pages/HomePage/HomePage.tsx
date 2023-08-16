import React, { FC } from 'react';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import styles from './HomePage.module.css';
import { useAppSelector } from '../../services/hooks/hooks';
import { selectLoading, selectError } from '../../services/reducers/ingredients';

export const HomePage: FC = () => {
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  if (loading) {
    return <div className={styles.loading}>Ожидаем ответ от сервера...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка при получении данных: {error.message}</div>;
  }

  return (
    <main className={styles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}