import React, {FC} from "react";
import {v4 as uuidv4} from "uuid";
import {Link, useParams} from "react-router-dom";

import styles from "./IngredientPage.module.css";
import {useAppSelector} from "../../services/hooks/hooks";
import {RootState} from "../../services/types/types";

export const IngredientPage:FC = () => {
    const { id } = useParams();

    const { ingredients } = useAppSelector((state:RootState) => state.ingredients);

    const selectedIngredient = ingredients.find((item:{ _id:string|undefined }) => item._id === id);

    const nutrientLabels = [
        { label: "Калории, ккал", value: "calories" },
        { label: "Белки, г", value: "proteins" },
        { label: "Жиры, г", value: "fat" },
        { label: "Углеводы, г", value: "carbohydrates" },
    ];

    if (!selectedIngredient) {
        return (
            <div className={`${styles.error}`}>
                <h1 className="text text_type_main-large mb-5 pt-10 error-h1">
                    Oops! Ingredient not found
                </h1>

                <p className="text text_type_main-medium mb-4 error-p">
                    The page you requested does not exist
                </p>

                <p className="text text_type_main-medium error-p">
                    check the address or try{" "}

                    <Link to="/" className={styles.link}>
                        homepage
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className="text text_type_main-large mb-6">
                        Детали ингредиента
                    </h1>

                    <div className="mb-4 mt-4">
                        <img
                            src={selectedIngredient.image_large}
                            alt={selectedIngredient.name}
                        />
                    </div>

                    <div className={`${styles.flexContainer}`}>
                        <p className="text text_type_main-medium mb-8">
                            {selectedIngredient.name}
                        </p>

                        <div className={`${styles.flex} text_color_inactive`}>
                            {nutrientLabels.map((nutrient) => (
                                <div key={uuidv4()}>
                                    <p className='text text_type_main-default text_color_inactive mb-2'>{nutrient.label}</p>

                                    <p className='text text_type_digits-default text_color_inactive'>{selectedIngredient[nutrient.value]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
