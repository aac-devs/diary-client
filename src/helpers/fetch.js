const baseUrl = 'https://aac-diary-app.herokuapp.com/api';
// const baseUrl = 'http://localhost:8080/api';

const fetchWithToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}${endpoint}`;
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(data),
  });
};

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  }
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export { fetchWithToken, fetchWithoutToken };
