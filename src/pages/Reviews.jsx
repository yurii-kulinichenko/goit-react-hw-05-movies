import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { API_KEY } from 'constants';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`
        )
          .then(response => response.json())
          .then(data => {
            setReviews(data.results);
          });
      } catch {
        alert('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    getMovieReviews();
  }, [movieId]);

  const hasReview = !loading && reviews.length > 0;
  return (
    <div>
      {hasReview && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h6>{review.author}</h6>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {!hasReview && <p>We don't have any reviews for this movie</p>}
    </div>
  );
};

export default Reviews;
