import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../const';
import PrivateRoute from '../components/private-route/private-route';
import MainPage from '../pages/main/main';
import LoginPage from '../pages/login/login';
import FavoritesPage from '../pages/favorites/favorites';
import OfferPage from '../pages/offer/offer';
import NotFoundPage from '../pages/not-found/not-found';

type AppProps = {
  offersCount: number;
};

function App({offersCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage offersCount={offersCount} />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
