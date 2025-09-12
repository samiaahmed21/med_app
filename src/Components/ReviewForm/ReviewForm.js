import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ReviewForm.css';

const ReviewForm = ({ reviews }) => {
  const [reviewData, setReviewData] = useState(reviews);
  const [formInput, setFormInput] = useState({ name: '', review: '', rating: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleRatingClick = (star) => {
    setFormInput({ ...formInput, rating: star });
  };

  const handleSubmit = (e, index, closeModal) => {
    e.preventDefault();
    if (!formInput.name || !formInput.review || formInput.rating === 0) {
      alert('Please fill all fields and select a rating!');
      return;
    }

    const updatedReviews = [...reviewData];
    updatedReviews[index] = {
      ...updatedReviews[index],
      reviewGiven: true,
      submittedReview: { ...formInput },
    };

    setReviewData(updatedReviews);
    setFormInput({ name: '', review: '', rating: 0 });
    closeModal();
  };

  return (
    <div className="review-container">
      <h2>Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviewData.map((review, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{review.doctorName}</td>
              <td>{review.speciality}</td>
              <td>
                <Popup
                  trigger={
                    <button
                    disabled={review.reviewGiven}
                    className={review.reviewGiven ? 'review-given' : ''}
                  >
                    {review.reviewGiven ? 'Review Given' : 'Click Here'}
                  </button>
                  
                  }
                  modal
                  nested
                  contentStyle={{
                    background: 'white',
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: '0',
                    width: '350px',
                    maxWidth: '90%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {(close) => (
                    <div className="feedback-modal">
                      <h3>Give Your Review</h3>
                      <form onSubmit={(e) => handleSubmit(e, index, close)}>
                        <div className="form-group">
                          <label>Name:</label>
                          <input
                            type="text"
                            name="name"
                            value={formInput.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Review:</label>
                          <textarea
                            name="review"
                            value={formInput.review}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Rating:</label>
                          <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={star <= formInput.rating ? 'filled' : ''}
                                onClick={() => handleRatingClick(star)}
                                aria-label={`${star} star`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <button type="submit" className="submit-btn">
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Popup>
              </td>
              <td>
                {review.reviewGiven && review.submittedReview
                  ? review.submittedReview.review
                  : 'No'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {reviewData.map(
        (review, idx) =>
          review.reviewGiven && review.submittedReview && (
            <div key={idx} className="submitted-review">
              <h4>Review for {review.doctorName}</h4>
              <p>
                <strong>Name:</strong> {review.submittedReview.name}
              </p>
              <p>
                <strong>Review:</strong> {review.submittedReview.review}
              </p>
              <p>
                <strong>Rating:</strong>{' '}
                {Array.from({ length: review.submittedReview.rating }, (_, i) => (
                  <span key={i} className="filled">
                    ★
                  </span>
                ))}
              </p>
            </div>
          )
      )}
    </div>
  );
};

export default ReviewForm;
