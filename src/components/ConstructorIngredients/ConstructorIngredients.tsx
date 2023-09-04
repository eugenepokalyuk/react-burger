import React, { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ConstructorIngredients.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks/hooks";
import {
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SET_BUN,
} from "../../services/actions/burgerConstructor";
import { useDrag, useDrop } from "react-dnd";
import {
  IIngredient,
  DragHandleProps,
  DropTargetProps,
  ConstructorIngredientsProps,
  renderBunType,
  RootState,
} from "../../services/types/types";
import { Identifier } from "dnd-core";
import { v4 as uuidv4 } from "uuid";

const DragHandle: FC<DragHandleProps> = ({ id, index, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} className={`${styles.card}`}>
      {children}
    </div>
  );
};

const DropTarget: FC<DropTargetProps> = ({
  id,
  index,
  itemType,
  onMove,
  children,
}) => {
  const [, drop] = useDrop<
    {
      type: string;
      ingredient: IIngredient;
      index: number;
    },
    unknown,
    { handlerId: Identifier | null }
  >({
    accept: "ingredient",
    hover(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      const itemType = item.type;

      if (dragIndex === hoverIndex) {
        return;
      }

      onMove(dragIndex, hoverIndex, itemType);
      item.index = hoverIndex;
    },
  });

  return <div ref={drop}>{children}</div>;
};

const ConstructorIngredients: FC<ConstructorIngredientsProps> = ({ items }) => {
  const dispatch = useAppDispatch();
  const BUN_TYPE = "bun";
  const ingredientElementBun = useAppSelector(
    (store: RootState) => store.constructorIngredients.bun
  );

  const renderBun = (type: renderBunType) => {
    return ingredientElementBun === undefined ? (
      <div className={`${styles.bunItem}`}>
        <div className="mr-4">
          <p className={`text text_type_main-medium ml-10`}>
            {
              "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа"
            }
          </p>
        </div>
      </div>
    ) : (
      <div className={`${styles.bunItem}`}>
        <div className="mr-4">
          <ConstructorElement
            type={type}
            isLocked={true}
            text={`${ingredientElementBun.name} (${type === "top" ? "верх" : "низ"
              })`}
            price={ingredientElementBun.price}
            thumbnail={ingredientElementBun.image || ""}
            extraClass={styles.constructorElement}
          />
        </div>
      </div>
    );
  };

  const handleDelete = (item: IIngredient) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      key: item._id,
    });
  };

  const handleMove = (
    dragIndex: number,
    hoverIndex: number,
    itemType: string
  ) => {
    if (itemType === BUN_TYPE) {
      const draggedBun = items[dragIndex];
      const hoverBun = items[hoverIndex];

      if (
        draggedBun &&
        hoverBun &&
        draggedBun.type === BUN_TYPE &&
        hoverBun.type === BUN_TYPE
      ) {
        dispatch({
          type: SET_BUN,
          payload: draggedBun,
        });
      }
    } else {
      dispatch({
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        payload: { dragIndex, hoverIndex },
      });
    }
  };

  const renderIngredients = () => {
    const nonBunIngredients = items.filter((item) => item.type !== BUN_TYPE);

    return nonBunIngredients.map((item, index: number) => (
      <div key={index} className={`${styles.dragableItem}`}>
        <DropTarget
          id={uuidv4()}
          index={index}
          itemType={item.type}
          onMove={handleMove}
        >
          <DragHandle id={uuidv4()} index={index}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              extraClass={styles.constructorElement}
              handleClose={() => handleDelete(item)}
            />
          </DragHandle>
        </DropTarget>
      </div>
    ));
  };

  return (
    <>
      {ingredientElementBun === undefined ? (
        <>
          {renderBun(undefined)}
          <div className={`${styles.scrollable} ${styles.itemWidth}`}>
            <div className={styles.scrollableContentWrapper}>
              <div className={`${styles.scrollableContent} ${styles.ingredientWrapper}`}>
                {renderIngredients()}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {renderBun("top")}
          <div className={`${styles.scrollable} ${styles.itemWidth}`}>
            <div className={styles.scrollableContentWrapper}>
              <div className={styles.scrollableContent}>
                {renderIngredients()}
              </div>
            </div>
          </div>
          {renderBun("bottom")}
        </>
      )}
    </>
  );
};

export default ConstructorIngredients;