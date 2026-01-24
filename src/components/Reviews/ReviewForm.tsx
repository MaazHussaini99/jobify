import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { useAuth } from '../../contexts/AuthContext';
import { Review, ReviewType, JobPosting, UserProfile } from '../../types';
import { createReview, updateUserProfile } from '../../graphql/mutations';
import { StarRating } from '../Common';
import './Reviews.css';

const client = generateClient();

interface ReviewFormProps {
  job: JobPosting;
  reviewee: UserProfile;
  reviewType: ReviewType;
  onSuccess?: (review: Review) => void;
  onCancel?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  job,
  reviewee,
  reviewType,
  onSuccess,
  onCancel
}) => {
  const { profile } = useAuth();

  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    content: '',
    communicationRating: 0,
    qualityRating: 0,
    timelinessRating: 0,
    professionalismRating: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRatingChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateOverallRating = () => {
    const ratings = [
      formData.communicationRating,
      formData.qualityRating,
      formData.timelinessRating,
      formData.professionalismRating
    ].filter(r => r > 0);

    if (ratings.length === 0) return formData.rating;
    return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    if (formData.rating === 0) {
      setError('Please provide an overall rating');
      return;
    }

    if (!formData.content.trim()) {
      setError('Please write a review');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const overallRating = calculateOverallRating();

      const reviewInput = {
        reviewerId: profile.id,
        revieweeId: reviewee.id,
        jobId: job.id,
        rating: overallRating,
        title: formData.title.trim() || null,
        content: formData.content.trim(),
        communicationRating: formData.communicationRating || null,
        qualityRating: formData.qualityRating || null,
        timelinessRating: formData.timelinessRating || null,
        professionalismRating: formData.professionalismRating || null,
        reviewType,
        isPublic: true
      };

      const response: any = await client.graphql({
        query: createReview,
        variables: { input: reviewInput }
      });

      const newReview = response.data?.createReview;

      // Update reviewee's average rating
      const newTotalReviews = (reviewee.totalReviews || 0) + 1;
      const currentTotal = (reviewee.averageRating || 0) * (reviewee.totalReviews || 0);
      const newAverageRating = (currentTotal + overallRating) / newTotalReviews;

      await client.graphql({
        query: updateUserProfile,
        variables: {
          input: {
            id: reviewee.id,
            averageRating: newAverageRating,
            totalReviews: newTotalReviews
          }
        }
      });

      if (onSuccess && newReview) {
        onSuccess(newReview);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const revieweeName = `${reviewee.firstName} ${reviewee.lastName}`;
  const isReviewingEmployer = reviewType === 'PROFESSIONAL_TO_EMPLOYER';

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <h2>Write a Review</h2>
        <p>
          Share your experience {isReviewingEmployer ? 'working with' : 'hiring'}{' '}
          <strong>{revieweeName}</strong> on{' '}
          <strong>{job.title}</strong>
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="review-form">
        {/* Overall Rating */}
        <div className="rating-section">
          <label>Overall Rating *</label>
          <div className="rating-input">
            <StarRating
              rating={formData.rating}
              size="large"
              onRatingChange={(value) => handleRatingChange('rating', value)}
            />
            <span className="rating-label">
              {formData.rating > 0 && ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][formData.rating - 1]}
            </span>
          </div>
        </div>

        {/* Detailed Ratings */}
        <div className="detailed-ratings">
          <h3>Detailed Ratings (Optional)</h3>

          <div className="rating-row">
            <label>Communication</label>
            <StarRating
              rating={formData.communicationRating}
              size="medium"
              onRatingChange={(value) => handleRatingChange('communicationRating', value)}
            />
          </div>

          <div className="rating-row">
            <label>{isReviewingEmployer ? 'Clarity of Requirements' : 'Quality of Work'}</label>
            <StarRating
              rating={formData.qualityRating}
              size="medium"
              onRatingChange={(value) => handleRatingChange('qualityRating', value)}
            />
          </div>

          <div className="rating-row">
            <label>{isReviewingEmployer ? 'Payment Timeliness' : 'Delivery Timeliness'}</label>
            <StarRating
              rating={formData.timelinessRating}
              size="medium"
              onRatingChange={(value) => handleRatingChange('timelinessRating', value)}
            />
          </div>

          <div className="rating-row">
            <label>Professionalism</label>
            <StarRating
              rating={formData.professionalismRating}
              size="medium"
              onRatingChange={(value) => handleRatingChange('professionalismRating', value)}
            />
          </div>
        </div>

        {/* Review Content */}
        <div className="form-group">
          <label htmlFor="title">Review Title (Optional)</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Summarize your experience in a few words"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Your Review *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            rows={6}
            placeholder={isReviewingEmployer
              ? "Describe your experience working with this employer. Was the project clearly defined? Were payments on time? Would you work with them again?"
              : "Describe the professional's work quality, communication, and overall performance. Would you hire them again?"
            }
            required
          />
          <span className="char-hint">Minimum 50 characters recommended</span>
        </div>

        {/* Actions */}
        <div className="form-actions">
          {onCancel && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
