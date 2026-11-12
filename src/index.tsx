import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './app/app';
import {store} from './store';
import {fillOffers} from './store/action';
import {fullOffers, offers} from './mocks/offers';
import {favoriteOffers} from './mocks/favorites';
import {reviews} from './mocks/reviews';

store.dispatch(fillOffers(offers));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        fullOffers={fullOffers}
        favoriteOffers={favoriteOffers}
        reviews={reviews}
      />
    </Provider>
  </React.StrictMode>
);
