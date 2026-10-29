import {useState} from 'react';
import PlaceCard from '../place-card/place-card';
import {OfferPreview} from '../../types/offer';

const ListClassName = {
  cities: 'cities__places-list places__list tabs__content',
  'near-places': 'near-places__list places__list',
} as const;

type OffersListProps = {
  offers: OfferPreview[];
  variant?: keyof typeof ListClassName;
};

function OffersList({offers, variant = 'cities'}: OffersListProps): JSX.Element {
  const [, setActiveOfferId] = useState<OfferPreview['id'] | null>(null);

  return (
    <div className={ListClassName[variant]}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={variant}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}

export default OffersList;
