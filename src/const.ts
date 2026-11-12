export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;

export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export type AuthorizationStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const RATING_OPTIONS = [
  {value: 5, title: 'perfect'},
  {value: 4, title: 'good'},
  {value: 3, title: 'not bad'},
  {value: 2, title: 'badly'},
  {value: 1, title: 'terribly'},
] as const;

export const MAX_REVIEWS_COUNT = 10;

export const MAX_NEARBY_COUNT = 3;

export const CommentLength = {
  Min: 50,
  Max: 300,
} as const;

export const CITIES = [
  {name: 'Paris', location: {latitude: 48.85661, longitude: 2.351499, zoom: 13}},
  {name: 'Cologne', location: {latitude: 50.938361, longitude: 6.959974, zoom: 13}},
  {name: 'Brussels', location: {latitude: 50.846557, longitude: 4.351697, zoom: 13}},
  {name: 'Amsterdam', location: {latitude: 52.37454, longitude: 4.897976, zoom: 13}},
  {name: 'Hamburg', location: {latitude: 53.550341, longitude: 10.000654, zoom: 13}},
  {name: 'Dusseldorf', location: {latitude: 51.225402, longitude: 6.776314, zoom: 13}},
] as const;

export type CityName = typeof CITIES[number]['name'];

export const DEFAULT_CITY: CityName = 'Paris';
