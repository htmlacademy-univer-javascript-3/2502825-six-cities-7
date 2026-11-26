import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, CityName, DEFAULT_CITY} from '../const';
import {Offer, OfferPreview} from '../types/offer';
import {Review} from '../types/review';
import {AuthInfo} from '../types/user';
import {
  addReview,
  changeCity,
  fillOffers,
  loadNearbyOffers,
  loadOffer,
  loadReviews,
  requireAuthorization,
  setOfferLoadingStatus,
  setOfferNotFound,
  setOffersLoadingStatus,
  setUser,
} from './action';

type InitialState = {
  city: CityName;
  offers: OfferPreview[];
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
  nearbyOffers: OfferPreview[];
  reviews: Review[];
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  isOfferNotFound: false,
  nearbyOffers: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOfferNotFound, (state, action) => {
      state.isOfferNotFound = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});
