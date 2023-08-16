import React, { createContext, useState } from 'react';

export const BurgerContext = createContext();

export const BurgerProvider = ({ children }) => {
  const [burgerIngredients, setBurgerIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setBurgerIngredients([...burgerIngredients, ingredient]);
  };

  const removeIngredient = (ingredientId) => {
    setBurgerIngredients(burgerIngredients.filter((item) => item.id !== ingredientId));
  };

  const clearIngredients = () => {
    setBurgerIngredients([]);
  };

  return (
    <BurgerContext.Provider
      value={{
        burgerIngredients,
        setBurgerIngredients,
        addIngredient,
        removeIngredient,
        clearIngredients,
      }}
    >
      {children}
    </BurgerContext.Provider>
  );
};