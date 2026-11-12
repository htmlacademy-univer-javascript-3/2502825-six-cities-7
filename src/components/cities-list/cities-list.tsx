import {MouseEvent} from 'react';
import {CityName} from '../../const';

type CitiesListProps = {
  cities: readonly CityName[];
  activeCity: CityName;
  onCityClick: (city: CityName) => void;
};

function CitiesList({cities, activeCity, onCityClick}: CitiesListProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item${city === activeCity ? ' tabs__item--active' : ''}`}
            href="#"
            onClick={(evt: MouseEvent<HTMLAnchorElement>) => {
              evt.preventDefault();
              onCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
