import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import {amsterdam, fullOffers, offers} from './mocks/offers';
import {favoriteOffers} from './mocks/favorites';
import {reviews} from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      city={amsterdam}
      offers={offers}
      fullOffers={fullOffers}
      favoriteOffers={favoriteOffers}
      reviews={reviews}
    />
  </React.StrictMode>
);
