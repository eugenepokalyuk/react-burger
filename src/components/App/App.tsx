import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { BurgerProvider } from '../../services/BurgerContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstructorIngredients } from '../../services/reducers/ingredients';
import { getIngredients } from '../../services/actions/ingredients'

const App = () => {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(selectConstructorIngredients);
  console.log('burgerIngredients', burgerIngredients)
  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients />

        <BurgerProvider>
          <BurgerConstructor burgerIngredients={burgerIngredients} />
        </BurgerProvider>
      </main>
    </>
  );
};

export default App;