import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useSearchParams } from 'react-router-dom';

import { API_KEY } from 'constants';

const Movies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ query: form.elements.query.value.trim() });
    form.reset();
  };

  useEffect(() => {
    const getMovie = async () => {
      if (query === null) return;
      try {
        await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        )
          .then(response => response.json())
          .then(data => {
            setMovies(data.results);
          });
      } catch {
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [query]);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {!loading && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${movie.id}`} state={{ from: location }}>
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default Movies;
