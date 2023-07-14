import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorIngredients.module.css';
import { BurgerContext } from '../../services/BurgerContext';

const ConstructorIngredients = ({ items, onIngredientAdd, onIngredientRemove }) => {
  const { burgerIngredients } = useContext(BurgerContext);
  const bunPrice = 20; // Стоимость булки

  const BUN_TYPE = 'bun';
  // const MAIN_TYPE = 'main';
  // const SAUCE_TYPE = 'sauces';

  useEffect(() => {
    calculateTotalPrice();
  }, [burgerIngredients]);

  console.log('burgerIngredients', burgerIngredients)


  const calculateTotalPrice = () => {
    const nonBunIngredients = burgerIngredients.filter((item) => item.type !== BUN_TYPE);
    const ingredientsPrice = nonBunIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = ingredientsPrice + 2 * bunPrice;
    onIngredientAdd({ price: totalPrice });
  };


  const renderBun = (type) => {
    return (
      <div className={`${styles.bunItem} mb-2`}>
        <div className='mr-4'>
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`Краторная булка N-200i (${type === 'top' ? 'верх' : 'низ'})`}
            price={bunPrice}
            thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            extraClass={styles.constructorElement}
          />
        </div>
      </div>
    );
  };

  const renderIngredients = () => {
    // ВНУТРИ МЕНЮ
    const nonBunIngredients = items.filter((item) => item.type !== BUN_TYPE);
    const burgerBasket = nonBunIngredients.map((item, index) => (
      <div
        key={index}
        className={`${styles.dragableItem} mr-4`}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          extraClass={styles.constructorElement}
        />
      </div>
    ));

    return burgerBasket;
  };

  return (
    <>
      {renderBun('top')}
      <div className={styles.scrollable}>
        <div className={styles.scrollableContentWrapper}>
          <div className={styles.scrollableContent}>
            {renderIngredients()}
          </div>
        </div>
      </div>
      {renderBun('bottom')}
    </>
  );
};

ConstructorIngredients.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onIngredientAdd: PropTypes.func.isRequired,
  onIngredientRemove: PropTypes.func.isRequired,
};

export default ConstructorIngredients;
