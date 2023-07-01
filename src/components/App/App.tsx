import React from 'react';
import styles from './App.module.css';
// Импортируем компоненты
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </>
  );
};

export default App;