import { Routes, Route, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import styled from 'styled-components';

const MovieDetails = lazy(() => import('components/MovieDetails/MovieDetails'));
const Home = lazy(() => import('pages/Home'));
const Movies = lazy(() => import('pages/Movies'));
const Cast = lazy(() => import('pages/Cast'));
const Reviews = lazy(() => import('pages/Reviews'));
const NotFound = lazy(() => import('pages/NotFound'));

const StyledLink = styled(NavLink)`
  color: black;
  margin-right: 10px;

  &.active {
    color: orange;
  }
`;

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div
          style={{
            borderBottom: '1px solid #ccc',
            padding: '20px',
          }}
        >
          <nav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/movies">Movies</StyledLink>
          </nav>
        </div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
};
