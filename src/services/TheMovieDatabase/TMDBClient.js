import axios from 'axios';

const API_KEY = process.env.THE_MOVIEDB_KEY;

const TMDBClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
  params: {
    language: 'es-MX',
  },
  // transformResponse: (data, headers) => {
  //   console.log('Intercepting response', { data, headers });
  //   return { ...JSON.parse(data), anotherData: ['a', 'b', 'c', 'd'], success: true };
  // }
});

const successResponsePromise = ({ data, status, headers }) => ({
  data: { success: true, ...data }, status, headers
});

const errorResponsePromise = ({ code, response }) => ({
  success: false,
  code,
  status: response.status,
  infoError: {
    code: response.data.status_code,
    error: response.data.status_message,
  },
});

const get = (path, params = {}, headers = {}) => new Promise((resolve, reject) => {
  TMDBClient.get(path, { params, headers })
    .then(response => resolve(successResponsePromise(response)))
    .catch(err => reject(errorResponsePromise(err)));
});

const post = (path, data, params = {}, headers = {}) => new Promise((resolve, reject) => {
  TMDBClient.post(path, data, { params, headers })
    .then(response => resolve(successResponsePromise(response)))
    .catch(err => reject(errorResponsePromise(err)));
});

export { get, post };
