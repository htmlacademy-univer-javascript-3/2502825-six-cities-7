import {Link, generatePath} from 'react-router-dom';
import {AppRoute} from '../../const';
import {OfferPreview} from '../../types/offer';

const CardVariant = {
  cities: {width: 260, height: 200, infoClassName: ''},
  favorites: {width: 150, height: 110, infoClassName: 'favorites__card-info'},
  'near-places': {width: 260, height: 200, infoClassName: ''},
} as const;

type PlaceCardProps = {
  offer: OfferPreview;
  variant?: keyof typeof CardVariant;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function PlaceCard({offer, variant = 'cities', onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const {id, title, type, price, previewImage, isFavorite, isPremium, rating} = offer;
  const offerLink = generatePath(AppRoute.Offer, {id});
  const {width, height, infoClassName} = CardVariant[variant];

  return (
    <article
      className={`${variant}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${variant}__image-wrapper place-card__image-wrapper`}>
        <Link to={offerLink}>
          <img className="place-card__image" src={previewImage} width={width} height={height} alt={title} />
        </Link>
      </div>
      <div className={`${infoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerLink}>{title}</Link>
        </h2>
        <p className="place-card__type">{type[0].toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
