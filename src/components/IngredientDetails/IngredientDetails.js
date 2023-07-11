import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/props-types';

const IngredientItem = ({ ingredient, getIngredientCount, setIsModalOpen, setSelectedIngredient }) => {
  
  const handleClick = () => {
    setIsModalOpen(true);
    setSelectedIngredient(ingredient);
  };

  return (
    <div
      key={ingredient._id}
      className={`${styles.cardItem} mb-5 mr-6`}
      onClick={handleClick}
    >
      <Counter count={getIngredientCount(ingredient)} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="p-1">
        <p className="text text_type_digits-default m-1">{ingredient.price}</p>
        <CurrencyIcon className={styles.CurrencyIcon} type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  getIngredientCount: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};

export default IngredientItem;