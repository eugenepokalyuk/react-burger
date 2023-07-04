import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { BurgerProvider } from '../../services/BurgerContext';

const App = () => {
  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients />

        <BurgerProvider>
          <BurgerConstructor burgerIngredients={[]}/>
        </BurgerProvider>

      </main>
    </>
  );
};

export default App;