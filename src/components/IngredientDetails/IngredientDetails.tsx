import React, { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientDetails.module.css";
import { useAppDispatch } from "../../services/hooks/hooks";
import {
  addViewedIngredient,
  clearViewedIngredient,
} from "../../services/actions/currentIngredient";
import { IngredientItemProps } from "../../services/types/types";
import { useDrag } from "react-dnd";
import { TCurrentIngredient } from '../../services/actions/currentIngredient'
import { Link, useLocation } from "react-router-dom";

const IngredientItem: FC<IngredientItemProps> = ({
  ingredient,
  getIngredientCount,
  setIsModalOpen,
  setSelectedIngredient,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleClick = () => {
    dispatch(clearViewedIngredient());
    dispatch(addViewedIngredient(ingredient) as TCurrentIngredient);

    setIsModalOpen(true);
    setSelectedIngredient(ingredient);
  };

  const [, dragTarget] = useDrag({
    type: "items",
    item: ingredient,
  });

  return (
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={{ background: location }}
      key={ingredient._id}
      className={`${styles.cardItem} mb-5 mr-6`}
      ref={dragTarget}
      onClick={handleClick}
    >
      <Counter count={getIngredientCount(ingredient)} size="default" />
      <img src={ingredient.image} alt={ingredient.name} />
      <div className="p-1">
        <p className="text text_type_digits-default m-1">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </Link>
  );
};

export default IngredientItem;