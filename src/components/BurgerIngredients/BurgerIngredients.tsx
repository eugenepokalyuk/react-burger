import React, { useState, useRef, useEffect, useMemo, RefObject, FC } from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItem from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { fetchIngredientsData } from '../../utils/api';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchIngredientsRequest
} from '../../services/actions/ingredients';
import {
  fetchConstructorIngredientsRequest
} from '../../services/actions/burgerConstructor'
import {
  selectConstructorIngredients,
} from '../../services/selectors/selectors';

import { Ingredient, NutrientProperty } from '../../services/types/types'

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const constructorIngredients = useAppSelector(selectConstructorIngredients);

  const selectedBun = useAppSelector((store) => store.constructorIngredients.bun);

  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [activeTab, setActiveTab] = useState<string>('Булки');

  const handleIngredientClick = (ingredientId: string) => {
    if (id) {
      setIsModalOpen(true);
    } else {
      navigate(`/ingredients/${ingredientId}`);
    }
  };

  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: '-40px 0px 0px 0px',
      threshold: 1.0,
    };

    const getIngredientsData = async () => {
      try {
        const data = await fetchIngredientsData();
        setIngredientsData(data);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getIngredientsData();

    dispatch(fetchIngredientsRequest());
    dispatch(fetchConstructorIngredientsRequest());

    const observer = new IntersectionObserver(handleIntersection, options);

    if (bunRef.current) observer.observe(bunRef.current);
    if (saucesRef.current) observer.observe(saucesRef.current);
    if (mainsRef.current) observer.observe(mainsRef.current);

    return () => {
      observer.disconnect();
    };
  }, [dispatch]);

  const BUN_TYPE = 'bun';
  const MAIN_TYPE = 'main';
  const SAUCE_TYPE = 'sauce';

  const nutrientLabels: Array<{ label: string; value: NutrientProperty }> = [
    { label: 'Калории', value: 'calories' },
    { label: 'Белки', value: 'proteins' },
    { label: 'Жиры', value: 'fat' },
    { label: 'Углеводы', value: 'carbohydrates' },
  ];

  const closeModal = () => {
    navigate(-1);
    setIsModalOpen(false);
  };

  const handleTabClick = (value: string, ref: RefObject<HTMLHeadingElement>) => {
    setActiveTab(value);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
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

  const getIngredientCount = (ingredient: Ingredient) => {
    if (ingredient.type === BUN_TYPE) {
      if (selectedBun && selectedBun._id === ingredient._id) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (constructorIngredients.ingredients && constructorIngredients.ingredients.length > 0) {
        const ingredientId = ingredient._id;
        const count = constructorIngredients.ingredients.filter((item: Ingredient) => item._id === ingredientId).length;
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
            onClick={() => handleIngredientClick(ingredient._id)}
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
            onClick={() => handleIngredientClick(ingredient._id)}
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
            onClick={() => handleIngredientClick(ingredient._id)}
          />
        ))}
      </div>

      {isModalOpen && selectedIngredient && (
        <Modal onClose={closeModal} header='Детали ингредиента'>
          <div className='mb-4 mt-4'>
            <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
          </div>
          <div>
            <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>
            <div className={`${styles.flex} text_color_inactive`}>
              {nutrientLabels.map((nutrient) => (
                <div key={nutrient.label}>
                  <p className='text text_type_main-default text_color_inactive'>{nutrient.label}</p>
                  <p className='text text_type_main-default text_color_inactive'>
                    {selectedIngredient[nutrient.value as keyof Ingredient]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

    </section>
  );
};

export default BurgerIngredients;