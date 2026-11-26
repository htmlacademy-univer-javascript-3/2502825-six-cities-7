import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {CommentLength, RATING_OPTIONS} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postReviewAction} from '../../store/api-actions';
import {Offer} from '../../types/offer';

type Rating = typeof RATING_OPTIONS[number]['value'];

type ReviewFormData = {
  rating: Rating | null;
  comment: string;
};

type ReviewFormProps = {
  offerId: Offer['id'];
};

const INITIAL_FORM_DATA: ReviewFormData = {rating: null, comment: ''};

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<ReviewFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const commentLength = formData.comment.trim().length;
  const isValid = formData.rating !== null
    && commentLength >= CommentLength.Min
    && commentLength <= CommentLength.Max;

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: name === 'rating' ? Number(value) : value});
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (!isValid || formData.rating === null) {
      return;
    }

    setIsSubmitting(true);
    setHasError(false);

    dispatch(postReviewAction({offerId, comment: formData.comment.trim(), rating: formData.rating}))
      .unwrap()
      .then(() => setFormData(INITIAL_FORM_DATA))
      .catch(() => setHasError(true))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_OPTIONS.map(({value, title}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              disabled={isSubmitting}
              onChange={handleFieldChange}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        maxLength={CommentLength.Max}
        value={formData.comment}
        disabled={isSubmitting}
        onChange={handleFieldChange}
      >
      </textarea>
      {hasError && (
        <p className="reviews__error" style={{color: '#ff5a5a'}}>
          Failed to send your review. Please try again.
        </p>
      )}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.Min} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid || isSubmitting}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
