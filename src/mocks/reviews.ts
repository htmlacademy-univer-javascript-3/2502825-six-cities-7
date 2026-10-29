import {Review} from '../types/review';

export const reviews: Review[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: false,
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4,
  },
  {
    id: '9a5f6a5e-1b2c-4d3e-8f90-123456789abc',
    date: '2023-11-21T10:05:12.000Z',
    user: {
      name: 'Max',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/4.jpg',
      isPro: true,
    },
    comment: 'Great location, very clean apartment and friendly host. Would definitely stay here again.',
    rating: 4.6,
  },
  {
    id: 'c3d4e5f6-7a8b-4c9d-8e0f-abcdef012345',
    date: '2021-02-14T18:30:00.000Z',
    user: {
      name: 'Kate',
      avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: false,
    },
    comment: 'The place was fine, but the street was a bit noisy at night. Breakfast nearby is excellent.',
    rating: 3.2,
  },
];
