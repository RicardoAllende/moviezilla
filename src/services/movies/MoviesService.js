import { MoviesClient } from '@src/services/movies/MoviesClient';

export const getMovie = (movieId, params = {}, headers = {}) =>
  MoviesClient.get(`/movie/${movieId}`, { params, headers });
