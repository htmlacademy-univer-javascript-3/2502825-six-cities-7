import {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, CITIES, SortType} from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';
import {selectCity, selectCityOffers} from '../../store/selectors';
import {sortOffers} from '../../utils';
import {OfferPreview} from '../../types/offer';

const cityNames = CITIES.map(({name}) => name);

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector(selectCity);
  const offers = useAppSelector(selectCityOffers);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);
  const sortedOffers = useMemo(() => sortOffers(offers, activeSort), [offers, activeSort]);
  const city = CITIES.find(({name}) => name === activeCity) ?? CITIES[0];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link className="header__nav-link" to={AppRoute.Main}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cityNames} activeCity={activeCity} onCityClick={(cityName) => dispatch(changeCity(cityName))} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <SortOptions activeSort={activeSort} onSortChange={setActiveSort} />
              <OffersList offers={sortedOffers} onActiveOfferChange={setActiveOfferId} />
            </section>
            <div className="cities__right-section">
              <Map className="cities__map" city={city} offers={offers} activeOfferId={activeOfferId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
