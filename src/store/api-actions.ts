import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance, isAxiosError} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {APIRoute, AuthorizationStatus} from '../const';
import {Offer, OfferPreview} from '../types/offer';
import {Review, ReviewData} from '../types/review';
import {AppDispatch, State} from '../types/state';
import {AuthData, AuthInfo} from '../types/user';
import {saveToken} from '../services/token';
import {
  addReview,
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

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));

    try {
      const {data} = await api.get<OfferPreview[]>(APIRoute.Offers);
      dispatch(fillOffers(data));
    } finally {
      dispatch(setOffersLoadingStatus(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferLoadingStatus(true));
    dispatch(setOfferNotFound(false));
    dispatch(loadOffer(null));

    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(loadOffer(data));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(setOfferNotFound(true));
        return;
      }

      throw error;
    } finally {
      dispatch(setOfferLoadingStatus(false));
    }
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(loadNearbyOffers([]));
    const {data} = await api.get<OfferPreview[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyOffers(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(loadReviews([]));
    const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadReviews(data));
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postReview',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    dispatch(addReview(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<AuthInfo>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(setUser(null));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<AuthInfo>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  },
);
