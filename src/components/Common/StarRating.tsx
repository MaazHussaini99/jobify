import React from 'react';
import './Common.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  readonly = false,
  size = 'medium',
  onRatingChange,
  showValue = false
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div className={`star-rating star-rating-${size} ${readonly ? 'readonly' : 'interactive'}`}>
      {[...Array(maxRating)].map((_, index) => {
        const value = index + 1;
        const filled = displayRating >= value;
        const halfFilled = !filled && displayRating > index && displayRating < value;

        return (
          <span
            key={index}
            className={`star ${filled ? 'filled' : ''} ${halfFilled ? 'half-filled' : ''}`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              viewBox="0 0 24 24"
              fill={filled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
        );
      })}
      {showValue && <span className="rating-value">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
