import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientItem from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { fetchIngredientsData } from '../../utils/api';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredientsRequest
} from '../../services/actions/ingredients';

import {
  fetchConstructorIngredientsRequest
} from '../../services/actions/burgerConstructor'

import {
  selectIngredients,
  selectConstructorIngredients,
  selectLoading,
  selectError,
} from '../../services/reducers/ingredients';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchIngredientsRequest());
    dispatch(fetchConstructorIngredientsRequest());
  }, [dispatch]);

  //#region [ Initialization of variables ]
  const BUN_TYPE = 'bun';
  const MAIN_TYPE = 'main';
  const SAUCE_TYPE = 'sauce';

  const nutrientLabels = [
    { label: 'Калории, ккал', value: 'calories' },
    { label: 'Белки, г', value: 'proteins' },
    { label: 'Жиры, г', value: 'fat' },
    { label: 'Углеводы, г', value: 'carbohydrates' },
  ];

  const [current, setCurrent] = useState('Булки');
  const bunRef = useRef();
  const mainsRef = useRef();
  const saucesRef = useRef();
  const [basket, setBasket] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientsData, setIngredientsData] = useState([]);
  //#endregion

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const data = await fetchIngredientsData();
        setIngredientsData(data);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getIngredientsData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (value, ref) => {
    setCurrent(value);
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredBuns = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === BUN_TYPE),
    [ingredientsData]
  );

  const filteredSauces = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === SAUCE_TYPE),
    [ingredientsData]
  );

  const filteredMains = useMemo(
    () => ingredientsData.filter((ingredient) => ingredient.type === MAIN_TYPE),
    [ingredientsData]
  );

  const getIngredientCount = (ingredient) => {
    const ingredientCount = basket.filter((item) => item.text === ingredient.name).length;
    return ingredientCount;
  };

  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>

      <div className={styles.container_flex}>
        <Tab value="Булки" active={current === 'Булки'} onClick={() => handleTabClick('Булки', bunRef)}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={() => handleTabClick('Соусы', saucesRef)}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={() => handleTabClick('Начинки', mainsRef)}>
          Начинки
        </Tab>
      </div>

      <div className={`${styles.scrollable} mt-10`}>
        <h2 className='text text_type_main-medium mb-6' ref={bunRef}>Булки</h2>
        {filteredBuns.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            getIngredientCount={getIngredientCount}
            setIsModalOpen={setIsModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={saucesRef}>Соусы</h2>
        {filteredSauces.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            getIngredientCount={getIngredientCount}
            setIsModalOpen={setIsModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={mainsRef}>Начинки</h2>
        {filteredMains.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            getIngredientCount={getIngredientCount}
            setIsModalOpen={setIsModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal} header='Детали ингредиента'>
          {selectedIngredient && (
            <>
              <div className='mb-4 mt-4'>
                <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
              </div>
              <div>
                <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
                <div className={`${styles.flex} text_color_inactive`}>
                  {nutrientLabels.map((nutrient) => (
                    <div key={nutrient.label}>
                      <p className='text text_type_main-default text_color_inactive'>{nutrient.label}</p>
                      <p className='text text_type_main-default text_color_inactive'>{selectedIngredient[nutrient.value]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </Modal>
      )}
    </section>
  );
};

BurgerIngredients.propTypes = {
  current: PropTypes.string,
  bunRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  mainsRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  saucesRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  basket: PropTypes.arrayOf(PropTypes.object),
  isModalOpen: PropTypes.bool,
  selectedIngredient: PropTypes.object
};

export default BurgerIngredients;