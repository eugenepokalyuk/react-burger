import React, { useState, useRef, useEffect } from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientItem from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

const nutrientLabels = [
  { label: 'Калории, ккал', value: 'calories' },
  { label: 'Белки, г', value: 'proteins' },
  { label: 'Жиры, г', value: 'fat' },
  { label: 'Углеводы, г', value: 'carbohydrates' },
];

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('Булки');
  const bunRef = useRef();
  const mainsRef = useRef();
  const saucesRef = useRef();
  const [basket, setBasket] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      try {
        const uri = 'https://norma.nomoreparties.space/api/ingredients';
        const response = await fetch(uri);

        if (!response.ok) {
          throw new Error('Ошибка получения данных');
        }

        const data = await response.json();
        setIngredientsData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIngredientsData();
  }, []);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (value, ref) => {
    setCurrent(value);
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getIngredientCount = (ingredient) => {
    const ingredientCount = basket.filter((item) => item.text === ingredient.name).length;
    return ingredientCount;
  };

  return (
    <section className={BurgerIngredientsStyles.container}>
      <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>

      <div style={{ display: 'flex' }}>
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

      <div className={`${BurgerIngredientsStyles.scrollable} mt-10`}>
        <h2 className='text text_type_main-medium mb-6' ref={bunRef}>Булки</h2>
        {Array.isArray(ingredientsData) &&
          ingredientsData
            .filter((ingredient) => ingredient.type === 'bun')
            .map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                getIngredientCount={getIngredientCount}
                setIsModalOpen={setIsModalOpen}
                setSelectedIngredient={setSelectedIngredient}
              />
            ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={saucesRef}>Соусы</h2>
        {Array.isArray(ingredientsData) &&
          ingredientsData
            .filter((ingredient) => ingredient.type === 'sauce')
            .map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                getIngredientCount={getIngredientCount}
                setIsModalOpen={setIsModalOpen}
                setSelectedIngredient={setSelectedIngredient}
              />
            ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={mainsRef}>Начинки</h2>
        {Array.isArray(ingredientsData) &&
          ingredientsData
            .filter((ingredient) => ingredient.type === 'main')
            .map((ingredient) => (
              <IngredientItem
                key={ingredient._id}
                ingredient={ingredient}
                getIngredientCount={getIngredientCount}
                setIsModalOpen={setIsModalOpen}
                setSelectedIngredient={setSelectedIngredient}
              />
            ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} header='Детали ингредиента'>
        {selectedIngredient && (
          <>
            <div className='mb-4 mt-4'>
              <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
            </div>
            <div>
              <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
              <div className={`${BurgerIngredientsStyles.flex} text_color_inactive`}>
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
