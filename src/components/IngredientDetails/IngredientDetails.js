import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { addViewedIngredient, clearViewedIngredient } from '../../services/actions/currentIngredient';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import { Link, useLocation } from 'react-router-dom';
const IngredientItem = ({ ingredient, getIngredientCount, setIsModalOpen, setSelectedIngredient }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClick = () => {
    dispatch(clearViewedIngredient());
    dispatch(addViewedIngredient(ingredient));

    setIsModalOpen(true);
    setSelectedIngredient(ingredient);
  };

  const [{ ingredientOpacity }, dragTarget] = useDrag({
    type: 'items',
    item: ingredient,
    collect: monitor => ({
      ingredientOpacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      key={ingredient._id}
      className={`${styles.cardItem} mb-5 mr-6`}
      onClick={handleClick}
      ref={dragTarget}
    >
      <Counter count={getIngredientCount(ingredient)} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="p-1">
        <p className="text text_type_digits-default m-1">{ingredient.price}</p>
        <CurrencyIcon className={styles.CurrencyIcon} type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </Link>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
  getIngredientCount: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setSelectedIngredient: PropTypes.func.isRequired,
};

export default IngredientItem;