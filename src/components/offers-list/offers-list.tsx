import PlaceCard from '../place-card/place-card';
import {OfferPreview} from '../../types/offer';

const ListClassName = {
  cities: 'cities__places-list places__list tabs__content',
  'near-places': 'near-places__list places__list',
} as const;

type OffersListProps = {
  offers: OfferPreview[];
  variant?: keyof typeof ListClassName;
  onActiveOfferChange?: (id: OfferPreview['id'] | null) => void;
};

function OffersList({offers, variant = 'cities', onActiveOfferChange}: OffersListProps): JSX.Element {
  return (
    <div className={ListClassName[variant]}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={() => onActiveOfferChange?.(offer.id)}
          onMouseLeave={() => onActiveOfferChange?.(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
