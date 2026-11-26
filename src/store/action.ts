import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus, CityName} from '../const';
import {Offer, OfferPreview} from '../types/offer';
import {Review} from '../types/review';
import {AuthInfo} from '../types/user';

export const changeCity = createAction<CityName>('city/change');

export const fillOffers = createAction<OfferPreview[]>('offers/fill');

export const setOffersLoadingStatus = createAction<boolean>('offers/setLoadingStatus');

export const loadOffer = createAction<Offer | null>('offer/load');

export const setOfferLoadingStatus = createAction<boolean>('offer/setLoadingStatus');

export const setOfferNotFound = createAction<boolean>('offer/setNotFound');

export const loadNearbyOffers = createAction<OfferPreview[]>('offer/loadNearby');

export const loadReviews = createAction<Review[]>('offer/loadReviews');

export const addReview = createAction<Review>('offer/addReview');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUser = createAction<AuthInfo | null>('user/setUser');
