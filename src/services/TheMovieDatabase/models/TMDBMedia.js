import { get } from '../TMDBClient';

export class TMDBMedia {
  static availableResources = {
    MOVIES: 'movie',
    TV: 'tv',
  };

  constructor(resource) {
    if (!Object.values(TMDBMedia.availableResources).includes(resource)) {
      throw new Exception(`Resource <${resource}> is not implemented`);
    }
    this.resource = resource;
  }

  getDetailsUrl(id) {
    return `/${this.resource}/${id}`;
  }

  getDetails(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getImagesUrl(id) {
    return `/${this.resource}/${id}/images`;
  }

  getImages(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getRecommendationsUrl(id) {
    return `/${this.resource}/${id}/recommendations`;
  }

  getRecommendations(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getWatchProvidersUrl(id) {
    return `/${this.resource}/${id}/images`;
  }

  getWatchProviders(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getReviewsUrl(id) {
    return `/${this.resource}/${id}/reviews`;
  }

  getReviews(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getVideosUrl(id) {
    return `/${this.resource}/${id}/videos`;
  }

  getVideos(id, params = {}, headers = {}) {
    return get(this.getDetailsUrl(id), { params, headers });
  }

  getLatestUrl() {
    return `/${this.resource}/latest`;
  }

  getLatest(params = {}, headers = {}) {
    return get(this.getLatestUrl(), { params, headers });
  }

  getPopularUrl() {
    return `/${this.resource}/popular`;
  }

  getPopular(params = {}, headers = {}) {
    return get(this.getPopularUrl(), { params, headers });
  }

  getTopRatedUrl() {
    return `/${this.resource}/top_rated`;
  }

  getTopRated(params = {}, headers = {}) {
    return get(this.getTopRatedUrl(), { params, headers });
  }
}
