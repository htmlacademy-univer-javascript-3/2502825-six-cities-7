import Review from '../review/review';
import {Review as ReviewData} from '../../types/review';
import {MAX_REVIEWS_COUNT} from '../../const';

type ReviewsListProps = {
  reviews: ReviewData[];
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  const shownReviews = [...reviews]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, MAX_REVIEWS_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {shownReviews.map((review) => <Review key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default ReviewsList;
