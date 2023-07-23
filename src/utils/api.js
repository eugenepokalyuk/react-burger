const ApiUrlPath = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((err) => Promise.reject(err));
  }
};

function request(endpoint, options) {
  const url = `${ApiUrlPath}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

export const fetchIngredientsData = () => {
  const endpoint = '/ingredients';
  return request(endpoint, {})
    .then((res) => {
      if (res?.success) return res.data;
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

export const signIn = () => { };
export const signOut = () => { };

export const resetPassword = (email) => {
  const endpoint = '/password-reset';
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email
    }),
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error('Ошибка при создании заказа');
    });
};

export const sendPassword = (password, token) => {
  const endpoint = '/password-reset/reset';
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      token: token
    }),
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error('Ошибка при создании заказа');
    });
};

export const createUser = (name, email, password) => {
  const endpoint = '/auth/register';
  return request(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw new Error('Ошибка при создании заказа');
    });
};

export const editUser = (name, email, password) => {
  // const endpoint = '/auth/register';
  // return request(endpoint, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     email: email,
  //     password: password,
  //     name: name
  //   }),
  // })
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((error) => {
  //     throw new Error('Ошибка при создании заказа');
  //   });
};