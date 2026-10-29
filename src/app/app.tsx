import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../const';
import PrivateRoute from '../components/private-route/private-route';
import MainPage from '../pages/main/main';
import LoginPage from '../pages/login/login';
import FavoritesPage from '../pages/favorites/favorites';
import OfferPage from '../pages/offer/offer';
import NotFoundPage from '../pages/not-found/not-found';
import {City, Offer, OfferPreview} from '../types/offer';
import {Review} from '../types/review';

type AppProps = {
  city: City;
  offers: OfferPreview[];
  fullOffers: Offer[];
  favoriteOffers: OfferPreview[];
  reviews: Review[];
};

function App({city, offers, fullOffers, favoriteOffers, reviews}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage city={city} offers={offers} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute isAuthorized={false}>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage offers={fullOffers} nearbyOffers={offers} reviews={reviews} />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
