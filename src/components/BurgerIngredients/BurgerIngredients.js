import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsData from '../../utils/data.json';
import Modal from '../Modal/Modal';

const nutrientLabels = [
  { label: 'Калории, ккал', value: 'calories' },
  { label: 'Белки, г', value: 'proteins' },
  { label: 'Жиры, г', value: 'fat' },
  { label: 'Углеводы, г', value: 'carbohydrates' },
];

class BurgerIngredients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'Булки',
      bunRef: React.createRef(), // Реф для контейнера с булками
      mainsRef: React.createRef(), // Реф для контейнера с начинками
      saucesRef: React.createRef(), // Реф для контейнера со соусами
      basket: [], // Корзина с ингредиентами
      isModalOpen: false,
      selectedIngredient: null
    };
  }

  setCurrent = (value) => {
    this.setState({ current: value });
  };

  handleOrderClick = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleTabClick = (value) => {
    this.setState({ current: value }, () => {
      // После обновления состояния выполнится колбэк
      switch (value) {
        case 'Булки':
          this.state.bunRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'Начинки':
          this.state.mainsRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        case 'Соусы':
          this.state.saucesRef.current.scrollIntoView({ behavior: 'smooth' });
          break;
        default:
          // ?
          break;
      }
    });
  };

  // getIngredientCount = (ingredient) => {
  //   const ingredientCount = this.state.basket.filter(item => item.id === ingredient._id).length;
  //   return ingredientCount;
  // };

  getIngredientCount = (ingredient) => {
    const ingredientCount = this.state.basket.filter(item => item.text === ingredient.name).length;
    return ingredientCount;
  };


  render() {
    const buns = ingredientsData.filter(ingredient => ingredient.type === 'bun');
    const mains = ingredientsData.filter(ingredient => ingredient.type === 'main');
    const sauces = ingredientsData.filter(ingredient => ingredient.type === 'sauce');

    // Отдельный компонент для элемента списка ингредиентов
    const IngredientItem = ({ ingredient }) => (
      <div key={ingredient._id} className={`${BurgerIngredientsStyles.cardItem} mb-5 mr-6`} onClick={() => this.setState({ isModalOpen: true, selectedIngredient: ingredient })}>
        <Counter count={this.getIngredientCount(ingredient)} size="default" />
        <img src={ingredient.image} alt={ingredient.name} />
        <div className='p-1'>
          <p className='text text_type_digits-default m-1'>{ingredient.price}</p>
          <CurrencyIcon className={BurgerIngredientsStyles.CurrencyIcon} type="primary" />
        </div>
        <p className='text text_type_main-default'>{ingredient.name}</p>
      </div>
    );

    const { isModalOpen, selectedIngredient } = this.state; // Добавляем деструктуризацию состояний

    return (
      <section className={BurgerIngredientsStyles.container}>
        <h1 className='text text_type_main-large mb-5 mt-10'>Соберите бургер</h1>

        <div style={{ display: 'flex' }}>
          <Tab value="Булки" active={this.state.current === 'Булки'} onClick={() => this.handleTabClick('Булки')}>
            Булки
          </Tab>
          <Tab value="Соусы" active={this.state.current === 'Соусы'} onClick={() => this.handleTabClick('Соусы')}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={this.state.current === 'Начинки'} onClick={() => this.handleTabClick('Начинки')}>
            Начинки
          </Tab>
        </div>

        <div className={`${BurgerIngredientsStyles.scrollable} mt-10`}>

          <h2 className='text text_type_main-medium mb-6' ref={this.state.bunRef}>Булки</h2>
          {buns.map(ingredient => (
            <IngredientItem key={ingredient._id} ingredient={ingredient} />
          ))}

          <h2 className='text text_type_main-medium mb-6 mt-10' ref={this.state.saucesRef}>Соусы</h2>
          {sauces.map(ingredient => (
            <IngredientItem key={ingredient._id} ingredient={ingredient} />
          ))}

          <h2 className='text text_type_main-medium mb-6 mt-10' ref={this.state.mainsRef}>Начинки</h2>
          {mains.map(ingredient => (
            <IngredientItem key={ingredient._id} ingredient={ingredient} />
          ))}

        </div>

        <Modal isOpen={isModalOpen} onClose={this.closeModal} header='Детали ингредиента'>
          {selectedIngredient && (
            <>

              <div className='mb-4 mt-4'>
                <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
              </div>
              <p className='text text_type_main-medium mb-8'>{selectedIngredient.name}</p>

              <div className={`${BurgerIngredientsStyles.flex} text_color_inactive`}>

                {nutrientLabels.map((nutrient) => (
                  <div key={nutrient.label}>
                    <p>{nutrient.label}</p>
                    <p>{selectedIngredient[nutrient.value]}</p>
                  </div>
                ))}

              </div>

            </>
          )}
        </Modal>

      </section>
    );
  }
}

export default BurgerIngredients;
