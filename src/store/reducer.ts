import {createReducer} from '@reduxjs/toolkit';
import {CityName, DEFAULT_CITY} from '../const';
import {OfferPreview} from '../types/offer';
import {changeCity, fillOffers} from './action';

type InitialState = {
  city: CityName;
  offers: OfferPreview[];
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    });
});
