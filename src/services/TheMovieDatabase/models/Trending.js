import { get } from '../TMDBClient';

export class Trending {
  getTrending(type, time, params, headers) {
    const url = `/trending/${type}/${time}`;
    return get(url, params, headers);
  }

  getAllDailyTrending(params = {}, headers = {}) {
    return this.getTrending('all', 'day', params, headers);
  }

  getAllWeeklyTrending(params = {}, headers = {}) {
    return this.getTrending('all', 'week', params, headers);
  }

  getMovieDailyTrending(params = {}, headers = {}) {
    return this.getTrending('movie', 'day', params, headers);
  }

  getMovieWeeklyTrending(params = {}, headers = {}) {
    return this.getTrending('movie', 'week', params, headers);
  }

  getTvDailyTrending(params = {}, headers = {}) {
    return this.getTrending('tv', 'day', params, headers);
  }

  getTvWeeklyTrending(params = {}, headers = {}) {
    return this.getTrending('tv', 'week', params, headers);
  }

  getPersonDailyTrending(params = {}, headers = {}) {
    return this.getTrending('person', 'day', params, headers);
  }

  getPersonWeeklyTrending(params = {}, headers = {}) {
    return this.getTrending('person', 'week', params, headers);
  }
}
