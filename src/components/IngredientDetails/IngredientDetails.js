import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsStyles from './IngredientDetails.module.css';

const IngredientItem = ({ ingredient, getIngredientCount, setIsModalOpen, setSelectedIngredient }) => {
  const handleClick = () => {
    setIsModalOpen(true);
    setSelectedIngredient(ingredient);
  };

  return (
    <div
      key={ingredient._id}
      className={`${BurgerIngredientsStyles.cardItem} mb-5 mr-6`}
      onClick={handleClick}
    >
      <Counter count={getIngredientCount(ingredient)} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="p-1">
        <p className="text text_type_digits-default m-1">{ingredient.price}</p>
        <CurrencyIcon className={BurgerIngredientsStyles.CurrencyIcon} type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  getIngredientCount: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};

export default IngredientItem;
