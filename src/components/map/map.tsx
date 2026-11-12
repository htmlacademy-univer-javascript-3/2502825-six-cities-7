import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {City, OfferPreview} from '../../types/offer';

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

type MapProps = {
  className: string;
  city: City;
  offers: OfferPreview[];
  activeOfferId?: OfferPreview['id'] | null;
};

function Map({className, city, offers, activeOfferId = null}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement>(null);
  const map = useMap(mapRef);

  useEffect(() => {
    if (!map) {
      return;
    }

    const {latitude, longitude, zoom} = city.location;
    map.setView([latitude, longitude], zoom);
  }, [map, city]);

  useEffect(() => {
    if (!map) {
      return;
    }

    const markers = leaflet.layerGroup(
      offers.map((offer) =>
        leaflet.marker([offer.location.latitude, offer.location.longitude], {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
      )
    ).addTo(map);

    return () => {
      markers.remove();
    };
  }, [map, offers, activeOfferId]);

  return <section className={`${className} map`} ref={mapRef}></section>;
}

export default Map;
