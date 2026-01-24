import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { generateClient } from 'aws-amplify/api';
import { formatDistanceToNow } from 'date-fns';
import { Review } from '../../types';
import { listReviewsByUser } from '../../graphql/queries';
import { StarRating, Loading, EmptyState, Pagination } from '../Common';
import './Reviews.css';

const client = generateClient();

interface ReviewListProps {
  userId: string;
  showTitle?: boolean;
}

const ReviewList: React.FC<ReviewListProps> = ({ userId, showTitle = true }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);

  const fetchReviews = async (loadMore = false) => {
    try {
      setIsLoading(true);

      const response: any = await client.graphql({
        query: listReviewsByUser,
        variables: {
          revieweeId: userId,
          limit: 10,
          nextToken: loadMore ? nextToken : null
        },
        authMode: 'userPool'
      });

      const fetchedReviews = response.data?.listReviews?.items || [];
      const newNextToken = response.data?.listReviews?.nextToken;

      if (loadMore) {
        setReviews(prev => [...prev, ...fetchedReviews]);
      } else {
        setReviews(fetchedReviews);
      }

      setNextToken(newNextToken);
    } catch (err: any) {
      setError(err.message || 'Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  if (isLoading && reviews.length === 0) {
    return <Loading message="Loading reviews..." />;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        }
        title="No reviews yet"
        description="Reviews will appear here after completing jobs."
      />
    );
  }

  // Calculate average ratings
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const avgCommunication = reviews.filter(r => r.communicationRating).reduce((sum, r) => sum + (r.communicationRating || 0), 0) / reviews.filter(r => r.communicationRating).length || 0;
  const avgQuality = reviews.filter(r => r.qualityRating).reduce((sum, r) => sum + (r.qualityRating || 0), 0) / reviews.filter(r => r.qualityRating).length || 0;
  const avgTimeliness = reviews.filter(r => r.timelinessRating).reduce((sum, r) => sum + (r.timelinessRating || 0), 0) / reviews.filter(r => r.timelinessRating).length || 0;
  const avgProfessionalism = reviews.filter(r => r.professionalismRating).reduce((sum, r) => sum + (r.professionalismRating || 0), 0) / reviews.filter(r => r.professionalismRating).length || 0;

  // Rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach(r => {
    const index = Math.floor(r.rating) - 1;
    if (index >= 0 && index < 5) ratingCounts[index]++;
  });

  return (
    <div className="review-list-container">
      {showTitle && (
        <div className="reviews-header">
          <h2>Reviews ({reviews.length})</h2>
        </div>
      )}

      {/* Rating Summary */}
      <div className="rating-summary">
        <div className="overall-rating">
          <span className="rating-big">{avgRating.toFixed(1)}</span>
          <StarRating rating={avgRating} readonly size="medium" />
          <span className="rating-count">{reviews.length} reviews</span>
        </div>

        <div className="rating-breakdown">
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="distribution-row">
                <span className="stars-label">{stars} stars</span>
                <div className="distribution-bar">
                  <div
                    className="distribution-fill"
                    style={{ width: `${(ratingCounts[stars - 1] / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="distribution-count">{ratingCounts[stars - 1]}</span>
              </div>
            ))}
          </div>

          {(avgCommunication > 0 || avgQuality > 0 || avgTimeliness > 0 || avgProfessionalism > 0) && (
            <div className="detailed-averages">
              {avgCommunication > 0 && (
                <div className="avg-item">
                  <span>Communication</span>
                  <div className="avg-value">
                    <StarRating rating={avgCommunication} readonly size="small" />
                    <span>{avgCommunication.toFixed(1)}</span>
                  </div>
                </div>
              )}
              {avgQuality > 0 && (
                <div className="avg-item">
                  <span>Quality</span>
                  <div className="avg-value">
                    <StarRating rating={avgQuality} readonly size="small" />
                    <span>{avgQuality.toFixed(1)}</span>
                  </div>
                </div>
              )}
              {avgTimeliness > 0 && (
                <div className="avg-item">
                  <span>Timeliness</span>
                  <div className="avg-value">
                    <StarRating rating={avgTimeliness} readonly size="small" />
                    <span>{avgTimeliness.toFixed(1)}</span>
                  </div>
                </div>
              )}
              {avgProfessionalism > 0 && (
                <div className="avg-item">
                  <span>Professionalism</span>
                  <div className="avg-value">
                    <StarRating rating={avgProfessionalism} readonly size="small" />
                    <span>{avgProfessionalism.toFixed(1)}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-card-header">
              <Link to={`/profile/${review.reviewerId}`} className="reviewer-info">
                {review.reviewer?.profilePicture ? (
                  <img src={review.reviewer.profilePicture} alt="" className="reviewer-avatar" />
                ) : (
                  <div className="avatar-placeholder small">
                    {review.reviewer?.firstName?.[0]}{review.reviewer?.lastName?.[0]}
                  </div>
                )}
                <div>
                  <p className="reviewer-name">
                    {review.reviewer?.firstName} {review.reviewer?.lastName}
                  </p>
                  {review.reviewer?.companyName && (
                    <p className="reviewer-company">{review.reviewer.companyName}</p>
                  )}
                </div>
              </Link>
              <div className="review-rating">
                <StarRating rating={review.rating} readonly size="small" />
                <span className="review-date">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>

            {review.title && <h4 className="review-title">{review.title}</h4>}
            <p className="review-content">{review.content}</p>

            {/* Detailed Ratings */}
            {(review.communicationRating || review.qualityRating || review.timelinessRating || review.professionalismRating) && (
              <div className="review-detailed-ratings">
                {review.communicationRating && (
                  <span className="detail-rating">
                    Communication: {review.communicationRating}/5
                  </span>
                )}
                {review.qualityRating && (
                  <span className="detail-rating">
                    Quality: {review.qualityRating}/5
                  </span>
                )}
                {review.timelinessRating && (
                  <span className="detail-rating">
                    Timeliness: {review.timelinessRating}/5
                  </span>
                )}
                {review.professionalismRating && (
                  <span className="detail-rating">
                    Professionalism: {review.professionalismRating}/5
                  </span>
                )}
              </div>
            )}

            {review.job && (
              <p className="review-project">
                Project: <Link to={`/jobs/${review.job.id}`}>{review.job.title}</Link>
              </p>
            )}

            {review.isVerified && (
              <span className="verified-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                Verified
              </span>
            )}

            {review.response && (
              <div className="review-response">
                <p className="response-label">Response:</p>
                <p className="response-content">{review.response}</p>
                {review.responseDate && (
                  <p className="response-date">
                    {formatDistanceToNow(new Date(review.responseDate), { addSuffix: true })}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Pagination
        hasMore={!!nextToken}
        isLoading={isLoading}
        onLoadMore={() => fetchReviews(true)}
      />
    </div>
  );
};

export default ReviewList;
