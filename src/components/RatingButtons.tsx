import React from 'react';
import { PerformanceRating, PERFORMANCE_RATINGS } from '../types';

interface RatingButtonsProps {
  selectedRating?: PerformanceRating;
  onRatingChange: (rating: PerformanceRating) => void;
}

export const RatingButtons: React.FC<RatingButtonsProps> = ({ selectedRating, onRatingChange }) => {
  return (
    <div className="rating-buttons">
      {Object.entries(PERFORMANCE_RATINGS).map(([key, rating]) => (
        <button
          key={key}
          className={`rating-btn ${key} ${selectedRating === key ? 'selected' : ''}`}
          onClick={() => onRatingChange(key as PerformanceRating)}
          title={rating.description}
        >
          <strong>{rating.label}</strong>
          <small>{rating.description}</small>
        </button>
      ))}
    </div>
  );
};