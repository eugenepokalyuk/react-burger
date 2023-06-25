import React from 'react';
import AppStyles from './App.module.css';
// Импортируем компоненты
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

class App extends React.Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className={AppStyles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </>
    );
  }
}

export default App;