import { Movie } from './models/Movie';
import { Trending } from './models/Trending';
import { TV } from './models/Tv';

export const moviesCollections = async () => {
  const movie = new Movie();
  const solvedPromises = await Promise.all([
    movie.getDetails(550),
    movie.getLatest(),
    movie.getPopular(),
  ]);
  console.log('The moviesCollection is', solvedPromises);
  return solvedPromises;
};

export const getTrendingsCollection = async () => {
  const trending = new Trending();
  const solvedPromises = await Promise.all([
    trending.getAllDailyTrending({ page: 1, perPage: 12, limit: 13, per_page: 14 }),
    // trending.getAllDailyTrending({ page: 2 }),
    // trending.getAllDailyTrending({ page: 3 }),
    // trending.getAllWeeklyTrending(),
  ]);
  console.log('The getTrendingsCollection is', solvedPromises);
  return solvedPromises;
};
