import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state';

export const selectCity = (state: State) => state.city;

export const selectOffers = (state: State) => state.offers;

export const selectIsOffersLoading = (state: State) => state.isOffersLoading;

export const selectOffer = (state: State) => state.offer;

export const selectIsOfferLoading = (state: State) => state.isOfferLoading;

export const selectIsOfferNotFound = (state: State) => state.isOfferNotFound;

export const selectNearbyOffers = (state: State) => state.nearbyOffers;

export const selectReviews = (state: State) => state.reviews;

export const selectAuthorizationStatus = (state: State) => state.authorizationStatus;

export const selectUser = (state: State) => state.user;

export const selectFavoriteCount = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isFavorite).length
);

export const selectCityOffers = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);
