import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types'
import { ingredientPropTypes } from '../../utils/props-types';
import { useDispatch, useSelector } from 'react-redux';
import { addViewedIngredient, clearViewedIngredient } from '../../services/actions/currentIngredient';
import { selectViewedIngredient } from '../../services/reducers/currentIngredient';
import { useDrag, useDrop } from 'react-dnd';

const IngredientItem = ({ ingredient, getIngredientCount, setIsModalOpen, setSelectedIngredient }) => {
  const dispatch = useDispatch();
  const viewedIngredient = useSelector(selectViewedIngredient);
  const burgerContent = useSelector(store => store.burger)

  const handleClick = () => {
    dispatch(clearViewedIngredient());

    setIsModalOpen(true);
    setSelectedIngredient(ingredient);
  };

  const [{ ingredientOpacity }, dragTarget] = useDrag({
    type: 'items',
    item: ingredient ,
    collect: monitor => ({
      ingredientOpacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (
    <div
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