import {createAction} from '@reduxjs/toolkit';
import {CityName} from '../const';
import {OfferPreview} from '../types/offer';

export const changeCity = createAction<CityName>('city/change');

export const fillOffers = createAction<OfferPreview[]>('offers/fill');
