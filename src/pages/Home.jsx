import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { API_KEY } from 'constants';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
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
    getMovies();
  }, []);

  return (
    <>
      {loading && <h1>Loading...</h1>},
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title || movie.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
