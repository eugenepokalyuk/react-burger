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
    console.error(error);
    throw error;
  }
};