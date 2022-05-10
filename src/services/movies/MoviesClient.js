import axios from 'axios';

const API_KEY = process.env.THE_MOVIEDB_KEY;

const MoviesClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 1000,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
  },
  params: {
    language: "es-MX",
  },
});

export { MoviesClient };
