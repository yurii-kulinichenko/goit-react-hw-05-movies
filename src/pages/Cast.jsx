import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { API_KEY, imageURL } from 'constants';

const Cast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieCredits = async () => {
      try {
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
        )
          .then(response => response.json())
          .then(data => {
            setCredits(data.cast);
          });
      } catch {
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    getMovieCredits();
  }, [movieId]);

  return (
    <div>
      {!loading && (
        <ul>
          {credits &&
            credits.map(credit => (
              <li key={credit.id}>
                <img
                  src={`${imageURL}${credit.profile_path}`}
                  alt="person"
                  height={150}
                />
                <p>{credit.name}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Cast;
