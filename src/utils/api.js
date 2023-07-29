const ApiUrlPath = 'https://norma.nomoreparties.space/api';
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
function request(endpoint, options) {
  const url = `${ApiUrlPath}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
//#region [ Ingridient Data ]
export const fetchIngredientsData = () => {
  const endpoint = '/ingredients';
  return request(endpoint, {})
    .then((res) => {
      if (res.success) return res.data;
      return Promise.reject(res);
    });
}

export const createOrder = (orderData) => {
  const endpoint = '/orders';
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error('Ошибка при создании заказа');
    });
};
//#endregion
//#region [ User Auth ]
// Переписать
export const resetPassword = async (email) => {
  try {
    const response = await fetch(`${ApiUrlPath}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });

    const data = await checkResponse(response);
    if (data.success) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const sendPassword = async (password, token) => {
  try {
    const response = await fetch(`${ApiUrlPath}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        token
      }),
    });

    const data = await checkResponse(response);
    if (data.success) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${ApiUrlPath}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });
    const data = await checkResponse(response);
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', "********");
      localStorage.setItem('userName', email.split('@')[0]);
      return data;
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${ApiUrlPath}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    });

    const data = await checkResponse(response);
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      localStorage.setItem('userEmail', email);
      localStorage.setItem('userPassword', "********");
      localStorage.setItem('userName', name);
      return data;
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateUser = async (name, email, password, accessToken) => {
  try {
    const response = await fetch(`${ApiUrlPath}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      },
      body: JSON.stringify({
        email,
        password,
        name
      })
    });

    const data = await checkResponse(response);

    if (data.success) {
      return data;
      // localStorage.setItem('accessToken', data.accessToken);
      // localStorage.setItem('refreshToken', data.refreshToken);
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const logoutUser = async () => {
  try {
    const response = await fetch(`${ApiUrlPath}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: refreshToken
      })
    });
    const data = await checkResponse(response);
    if (data.success) {
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUsers = () => {
  return fetchWithRefresh('GET', `${ApiUrlPath}/auth/user`)
}

export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${ApiUrlPath}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        token: refreshToken
      })
    });

    const data = await checkResponse(response);
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      return data;
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchWithRefresh = async (method, URL, endpoint) => {
  const option = {
    method: method,
    headers: {
      'Content-Type': "application/json",
      authorization: localStorage.getItem("accessToken")
    },
    body: JSON.stringify(endpoint)
  }
  try {
    const res = await fetch(URL, option);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      option.headers.authorization = refreshData.accessToken;
      const res = await fetch(URL, option); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
// написать getUsers
// если ошибка то refreshToken
//#endregion