import { TMDBMedia } from './TMDBMedia';

export class Movie extends TMDBMedia {
  constructor() {
    super(TMDBMedia.availableResources.MOVIES);
  }
}
