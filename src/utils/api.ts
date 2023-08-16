const ApiUrlPath = 'https://norma.nomoreparties.space/api';
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
const request = (endpoint: string, options: RequestInit) => {
  const url = `${ApiUrlPath}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}
export const fetchIngredientsData = () => {
  const endpoint = '/ingredients';
  return request(endpoint, {})
    .then((res) => {
      if (res.success) return res.data;
      return Promise.reject(res);
    });
}
export const createOrder = (orderData: any /* string[] */) => {
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
export const resetPassword = async (email: string) => {
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
export const sendPassword = async (password: string, token: string) => {
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
export const loginUser = async (email: string, password: string) => {
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
      localStorage.setItem('userName', email.split('@')[0]);
      return data;
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const registerUser = async (name: string, email: string, password: string) => {
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

      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userName', data.name);
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const updateUser = async (name: string, email: string, password: string) => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === null) {
      throw new Error('Access token is missing');
    }

    const response = await fetch(`${ApiUrlPath}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    const data = await checkResponse(response);
    if (data.success) {
      return data;
    } else {
      return Promise.reject(new Error(data.message || 'Unknown error'));
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const logoutUser = async (refreshToken: string) => {
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
      // nothing
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
export const refreshToken = async (refreshToken: string) => {
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
export const fetchWithRefresh = async (method: string, URL: string, endpoint?: string) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('accessToken') || '',
  });

  const option: RequestInit = {
    method: method,
    headers: headers,
    body: JSON.stringify(endpoint),
  };

  try {
    const res = await fetch(URL, option);
    return await checkResponse(res);
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {
      try {
        const refreshData = await refreshToken(localStorage.getItem('refreshToken') || '');

        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }

        localStorage.setItem('refreshToken', refreshData.refreshToken);
        localStorage.setItem('accessToken', refreshData.accessToken);

        headers.set('Authorization', refreshData.accessToken);

        const res = await fetch(URL, { ...option, headers });
        return await checkResponse(res);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(err);
    }
  }
};