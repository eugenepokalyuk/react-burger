import React, { FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ConstructorIngredients.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { MOVE_INGREDIENT_IN_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, SET_BUN } from '../../services/actions/burgerConstructor'
import { useDrag, useDrop } from 'react-dnd';

import { Ingredient, DragHandleProps, DropTargetProps, ConstructorIngredientsProps, renderBunType } from '../../services/types'

const DragHandle: FC<DragHandleProps> = ({ id, index, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

const DropTarget: FC<DropTargetProps> = ({ id, index, itemType, onMove, children }) => {
  const [, drop] = useDrop({
    accept: 'ingredient',
    hover(item: any) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      onMove(dragIndex, hoverIndex, item.type);
      item.index = hoverIndex;
    },
  });

  return <div ref={drop}>{children}</div>;
};

const ConstructorIngredients: FC<ConstructorIngredientsProps> = ({ items }) => {
  const dispatch = useDispatch();
  const BUN_TYPE = 'bun';
  const ingredientElementBun = useSelector((store: any) => store.constructorIngredients.bun);

  const renderBun = (type: renderBunType) => {
    return (
      ingredientElementBun === undefined
        ? (
          <div className={`${styles.bunItem}`}>
            <div className='mr-4'>
              <p className={`text text_type_main-medium ml-10`}>
                {'Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа'}
              </p>
            </div>
          </div>
        )
        : (
          <div className={`${styles.bunItem}`}>
            <div className='mr-4'>
              <ConstructorElement
                type={type}
                isLocked={true}
                text={`${ingredientElementBun.name} (${type === 'top' ? 'верх' : 'низ'})`}
                price={ingredientElementBun.price}
                thumbnail={ingredientElementBun.image}
                extraClass={styles.constructorElement}
              />
            </div>
          </div>
        )
    );
  };

  const handleDelete = (item: Ingredient) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      key: item._id
    })
  }

  const handleMove = (dragIndex: number, hoverIndex: number, itemType: string) => {
    if (itemType === BUN_TYPE) {
      const draggedBun = items[dragIndex];
      const hoverBun = items[hoverIndex];

      if (draggedBun && hoverBun && draggedBun.type === BUN_TYPE && hoverBun.type === BUN_TYPE) {
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
    return nonBunIngredients.map((item, index) => (
      <div
        key={item.uniqueId}
        className={`${styles.dragableItem} mr-4`}
      >
        <DropTarget id={item._id} index={index} itemType={item.type} onMove={handleMove}>
          <DragHandle id={item._id} index={index}>
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
      {ingredientElementBun === undefined
        ?
        <>
          {renderBun(undefined)}

          <div className={`${styles.scrollable} ${styles.itemWidth}`}>
            <div className={styles.scrollableContentWrapper}>
              <div className={styles.scrollableContent}>
                {renderIngredients()}
              </div>
            </div>
          </div>
        </>
        :
        <>
          {renderBun('top')}
          <div className={`${styles.scrollable} ${styles.itemWidth}`}>
            <div className={styles.scrollableContentWrapper}>
              <div className={styles.scrollableContent}>
                {renderIngredients()}
              </div>
            </div>
          </div>
          {renderBun('bottom')}
        </>
      }
    </>
  );
};

export default ConstructorIngredients;