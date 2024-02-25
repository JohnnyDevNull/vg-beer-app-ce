import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { extractBeerParams, fetchData } from './utils';
import { useParams } from 'react-router-dom';

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);

  const beerParams = beer ? extractBeerParams(beer) : [];
  const addressString = beerParams.join(', ');
  const beerUriString = encodeURI(addressString);
  const mapsUrl = `https://www.google.com/maps/embed/v1/search?key=YOUR_API_KEY&q=${beerUriString}`;

  return (
    <article>
      <section>
        <header data-cy="beer-header">
          <h1>{beer?.name}</h1>
        </header>
        <main>
          <span>
            <p data-cy="beer-type"><b>Type:</b> {beer?.brewery_type}</p>
            <p data-cy="beer-address"><b>Address:</b> {addressString} </p>
            {beer?.phone && <p data-cy="beer-phone"><b>Phone:</b> {beer?.phone} </p>}
            {beer?.website_url && <p data-cy="beer-website"><b>Website:</b> <a href={beer?.website_url} target="_blank" rel="nofollow noopener">{beer?.website_url}</a> </p>}

            <iframe
              width="100%"
              height="500"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsUrl}
              data-cy="beer-googlemaps">
            </iframe>
          </span>
        </main>
      </section>
    </article>
  );
};

export default Beer;
