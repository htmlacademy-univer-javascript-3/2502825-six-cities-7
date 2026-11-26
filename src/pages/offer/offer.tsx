import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, MAX_NEARBY_COUNT} from '../../const';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import HeaderNav from '../../components/header-nav/header-nav';
import Spinner from '../../components/spinner/spinner';
import NotFoundPage from '../not-found/not-found';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchNearbyOffersAction, fetchOfferAction, fetchReviewsAction} from '../../store/api-actions';
import {
  selectAuthorizationStatus,
  selectIsOfferLoading,
  selectIsOfferNotFound,
  selectNearbyOffers,
  selectOffer,
  selectReviews,
} from '../../store/selectors';

const MAX_IMAGES_COUNT = 6;

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const pluralize = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

function OfferPage(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(selectOffer);
  const isOfferLoading = useAppSelector(selectIsOfferLoading);
  const isOfferNotFound = useAppSelector(selectIsOfferNotFound);
  const nearbyOffers = useAppSelector(selectNearbyOffers);
  const reviews = useAppSelector(selectReviews);
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferAction(id));
    dispatch(fetchNearbyOffersAction(id));
    dispatch(fetchReviewsAction(id));
  }, [dispatch, id]);

  if (isOfferNotFound && !isOfferLoading) {
    return <NotFoundPage />;
  }

  if (isOfferLoading || !offer || offer.id !== id) {
    return <Spinner />;
  }

  const {
    title, description, type, price, rating, bedrooms, maxAdults,
    goods, host, images, isPremium, isFavorite, city,
  } = offer;
  const shownNearbyOffers = nearbyOffers.slice(0, MAX_NEARBY_COUNT);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, MAX_IMAGES_COUNT).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button
                  className={`offer__bookmark-button ${isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${Math.round(rating) * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalize(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {pluralize(bedrooms, 'Bedroom')}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {pluralize(maxAdults, 'adult')}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="offer__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>
          <Map
            className="offer__map"
            city={city}
            offers={[...shownNearbyOffers, offer]}
            activeOfferId={offer.id}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={shownNearbyOffers} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
