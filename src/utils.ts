import {SortType} from './const';
import {OfferPreview} from './types/offer';

export function sortOffers(offers: OfferPreview[], sortType: SortType): OfferPreview[] {
  switch (sortType) {
    case SortType.PriceLowToHigh:
      return [...offers].sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return [...offers].sort((a, b) => b.price - a.price);
    case SortType.TopRated:
      return [...offers].sort((a, b) => b.rating - a.rating);
    default:
      return offers;
  }
}
