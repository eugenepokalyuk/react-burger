import React, {FC} from "react";
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

import {Counter, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./IngredientDetails.module.css";
import {useAppDispatch} from "../../services/hooks/hooks";
import {
    addViewedIngredient,
    clearViewedIngredient,
    TCurrentIngredient,
} from "../../services/actions/currentIngredient";
import {IngredientItemProps} from "../../services/types/types";
import {addIngredientToConstructor} from "../../services/actions/burgerConstructor";

const IngredientItem:FC<IngredientItemProps> = ({
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

    const isDesktop = useMediaQuery({ minWidth: 961 });

    const isTablet = useMediaQuery({ minWidth: 376, maxWidth: 960 });

    const isMobile = useMediaQuery({ maxWidth: 375 });

    const handleAddToConstructor = () => {
        dispatch(addIngredientToConstructor(ingredient));
    }

    return (
        <>
            {isDesktop &&
              <>
                <Link
                  to={`/ingredients/${ingredient._id}`}
                  state={{ background: location }}
                  key={ingredient._id}
                  className={`${styles.cardItem} mb-5 mr-6`}
                  ref={dragTarget}
                  onClick={handleClick}
                  data-cy={`dragableIngredients-${ingredient._id}`}
                >
                  <Counter count={getIngredientCount(ingredient)} size="default"/>

                  <img src={ingredient.image} alt={ingredient.name}/>

                  <div className="p-1">
                    <p className="text text_type_digits-default m-1">{ingredient.price}</p>

                    <CurrencyIcon type="primary"/>
                  </div>

                  <p className="text text_type_main-default">{ingredient.name}</p>
                </Link>
              </>}

            {isMobile || isTablet &&
              <>
                <div className={styles.ingredientMobileContainer}>
                  <Link
                    to={`/ingredients/${ingredient._id}`}
                    state={{ background: location }}
                    key={ingredient._id}
                    className={`${styles.cardItem} mb-5 mr-6`}
                    ref={dragTarget}
                    onClick={handleClick}
                    data-cy={`dragableIngredients-${ingredient._id}`}
                  >
                    <Counter count={getIngredientCount(ingredient)} size="default"/>

                    <img src={ingredient.image} alt={ingredient.name}/>

                    <div className="p-1">
                      <p className="text text_type_digits-default m-1">{ingredient.price}</p>

                      <CurrencyIcon type="primary"/>
                    </div>

                    <p className="text text_type_main-default">{ingredient.name}</p>
                  </Link>
                    {isMobile || isTablet && (
                        <button className={`${styles.IngredientItemButton} text text_type_main-default`}
                                onClick={handleAddToConstructor}>Добавить</button>)}
                </div>
              </>}
        </>
    );
};

export default IngredientItem;
