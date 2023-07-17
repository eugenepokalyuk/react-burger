import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import IngredientItem from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { fetchIngredientsData } from '../../utils/api';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchIngredientsRequest
} from '../../services/actions/ingredients';
import {
  fetchConstructorIngredientsRequest
} from '../../services/actions/burgerConstructor'
import {
  selectConstructorIngredients,
} from '../../services/reducers/ingredients';
import { ADD_INGREDIENT_TO_CONSTRUCTOR, SET_BUN } from '../../services/actions/burgerConstructor';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const selectedBun = useSelector(store => store.constructorIngredients.bun);

  const bunRef = useRef(null);
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientsData, setIngredientsData] = useState([]);
  const [activeTab, setActiveTab] = useState('Булки'); // Добавлено объявление и инициализация activeTab

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

  useEffect(() => {
    dispatch(fetchIngredientsRequest());
    dispatch(fetchConstructorIngredientsRequest());
  }, [dispatch]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      dispatch({ type: ADD_INGREDIENT_TO_CONSTRUCTOR, content: { ...item } });
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const BUN_TYPE = 'bun';
  const MAIN_TYPE = 'main';
  const SAUCE_TYPE = 'sauce';

  const nutrientLabels = [
    { label: 'Калории, ккал', value: 'calories' },
    { label: 'Белки, г', value: 'proteins' },
    { label: 'Жиры, г', value: 'fat' },
    { label: 'Углеводы, г', value: 'carbohydrates' },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTabClick = (value, ref) => {
    setActiveTab(value);
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleIntersection = (entries) => {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let activeTab = '';

    entries.forEach((entry) => {
      const target = entry.target;

      if (target instanceof Element) {
        const distance = Math.abs(entry.boundingClientRect.top);
        const tabValue = target.getAttribute('data-tab');

        if (tabValue && distance < minDistance) {
          minDistance = distance;
          activeTab = tabValue;
        }
      }
    });

    if (!activeTab && entries.length > 0) {
      const defaultTabValue = entries[0].target.getAttribute('data-tab');
      if (defaultTabValue) {
        activeTab = defaultTabValue;
      }
    }

    setActiveTab(activeTab);
  };

  const options = {
    rootMargin: '-40px 0px 0px 0px',
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, options);

    observer.observe(bunRef.current);
    observer.observe(saucesRef.current);
    observer.observe(mainsRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

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
    if (ingredient.type === BUN_TYPE) {
      if (selectedBun && selectedBun._id === ingredient._id) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (constructorIngredients.ingredients && constructorIngredients.ingredients.length > 0) {
        const ingredientId = ingredient._id;
        const count = constructorIngredients.ingredients.filter(item => item._id === ingredientId).length;
        return count;
      }
      return 0;
    }
  };


  return (
    <section className={styles.container}>
      <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>

      <div className={styles.container_flex}>
        <Tab value="Булки" active={activeTab === 'Булки'} onClick={() => handleTabClick('Булки', bunRef)} data-tab="Булки">
          Булки
        </Tab>
        <Tab value="Соусы" active={activeTab === 'Соусы'} onClick={() => handleTabClick('Соусы', saucesRef)} data-tab="Соусы">
          Соусы
        </Tab>
        <Tab value="Начинки" active={activeTab === 'Начинки'} onClick={() => handleTabClick('Начинки', mainsRef)} data-tab="Начинки">
          Начинки
        </Tab>
      </div>

      <div className={`${styles.scrollable} mt-10`}>
        <h2 className='text text_type_main-medium mb-6' ref={bunRef} data-tab="Булки">Булки</h2>
        {filteredBuns.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            getIngredientCount={() => getIngredientCount(ingredient)}
            setIsModalOpen={setIsModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={saucesRef} data-tab="Соусы">Соусы</h2>
        {filteredSauces.map((ingredient) => (
          <IngredientItem
            key={ingredient._id}
            ingredient={ingredient}
            getIngredientCount={getIngredientCount}
            setIsModalOpen={setIsModalOpen}
            setSelectedIngredient={setSelectedIngredient}
          />
        ))}

        <h2 className='text text_type_main-medium mb-6 mt-10' ref={mainsRef} data-tab="Начинки">Начинки</h2>
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
  ingredientsData: PropTypes.object.isRequired,
};

export default BurgerIngredients;