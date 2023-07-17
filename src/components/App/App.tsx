// import { useEffect } from 'react';
// import styles from './App.module.css';
// import AppHeader from '../AppHeader/AppHeader';
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
// import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
// import { BurgerProvider } from '../../services/BurgerContext';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectConstructorIngredients, selectIngredients, selectLoading, selectError } from '../../services/reducers/ingredients';
// import { fetchIngredientsRequest } from '../../services/actions/ingredients';

// const App = () => {
//   const dispatch = useDispatch();
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const ingredientsData = useSelector(selectIngredients);

//   useEffect(() => {
//     dispatch(fetchIngredientsRequest());
//   }, [dispatch]);

//   if (loading) {
//     return <div className={styles.loading}>Ожидаем ответ от сервера...</div>;
//   }

//   if (error) {
//     return <div className={styles.loading}>Ошибка при получение ответа от сервера...</div>;
//   }

//   return (
//     <>
//       <AppHeader />
//       <main className={styles.container}>
//         <BurgerIngredients ingredientsData={ingredientsData} />

//         <BurgerProvider>
//           <BurgerConstructor />
//         </BurgerProvider>
//       </main>
//     </>
//   );
// };

// export default App;

import { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { BurgerProvider } from '../../services/BurgerContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectIngredients, selectLoading, selectError } from '../../services/reducers/ingredients';
import { fetchIngredientsRequest } from '../../services/actions/ingredients';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const ingredientsData = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchIngredientsRequest());
  }, [dispatch]);

  if (loading) {
    return <div className={styles.loading}>Ожидаем ответ от сервера...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка при получении данных: {error.message}</div>;
  }

  return (
    <>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients ingredientsData={ingredientsData} />

        <BurgerProvider>
          <BurgerConstructor />
        </BurgerProvider>
      </main>
    </>
  );
};

export default App;