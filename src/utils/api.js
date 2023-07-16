const ApiUrlPath = 'https://norma.nomoreparties.space/api';

// export const fetchIngredientsData = async () => {
//   try {
//     const response = await fetch(`${ApiUrlPath}/ingredients`);

//     if (!response.ok) {
//       throw new Error('Ошибка получения данных');
//     }

//     const data = await response.json();
//     return data.data;
//   } catch (error) {
//     throw new Error('Ошибка при получении ингредиентов заказа');
//   }
// };

const checkResponse = (res) => res.ok ? res.json() : res.json()
    .then((err) => Promise.reject(err));

export function fetchIngredientsData() {
    return fetch(`${ApiUrlPath}/ingredients`)
        .then(checkResponse)
        .then((res) => {
            if (res?.success) return res.data;
            return Promise.reject(res);    
        });
}


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
