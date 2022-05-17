import { TMDBMedia } from './TMDBMedia';

export class TV extends TMDBMedia {
  constructor() {
    super(TMDBMedia.availableResources.TV);
  }
}
