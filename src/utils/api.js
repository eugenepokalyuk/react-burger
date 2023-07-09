const ApiUrlPath = 'https://norma.nomoreparties.space/api';

export const fetchIngredientsData = async () => {
  try {
    const response = await fetch(`${ApiUrlPath}/ingredients`);

    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error('Ошибка при получении ингредиентов заказа');
  }
};

export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${ApiUrlPath}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании заказа');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Ошибка при создании заказа');
  }
};
