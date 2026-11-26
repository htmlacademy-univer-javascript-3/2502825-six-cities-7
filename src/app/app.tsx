import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';
import PrivateRoute from '../components/private-route/private-route';
import MainPage from '../pages/main/main';
import LoginPage from '../pages/login/login';
import FavoritesPage from '../pages/favorites/favorites';
import OfferPage from '../pages/offer/offer';
import NotFoundPage from '../pages/not-found/not-found';
import {useAppSelector} from '../hooks';
import {selectAuthorizationStatus, selectIsOffersLoading, selectOffers} from '../store/selectors';
import Spinner from '../components/spinner/spinner';

function App(): JSX.Element {
  const offers = useAppSelector(selectOffers);
  const isOffersLoading = useAppSelector(selectIsOffersLoading);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  if (isOffersLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
