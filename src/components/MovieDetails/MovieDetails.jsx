import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';

import { API_KEY, imageURL } from 'constants';

import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
        )
          .then(response => response.json())
          .then(data => {
            setFilm(data);
          });
      } catch {
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, [movieId]);

  return (
    <>
      {!loading && (
        <main>
          <Link to={location.state?.from || '/home'}>Go back</Link>
          <div className={css.main}>
            <img
              src={`${imageURL}${film.poster_path}`}
              alt="poster"
              height={300}
            />
            <div className={css.header}>
              <h2>{film.title || film.name}</h2>
              <p>User score: {Math.round(film.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{film.overview}</p>
              <h4>Genres</h4>
              <p>
                {film.genres?.map(genre => (
                  <span className={css.genre} key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
};

export default MovieDetails;
