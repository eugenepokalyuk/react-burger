import React, { FC } from "react";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import styles from "./HomePage.module.css";

export const HomePage: FC = () => {
  return (
    <main className={styles.container}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};