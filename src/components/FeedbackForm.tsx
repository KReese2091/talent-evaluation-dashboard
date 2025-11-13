import React, { useState } from 'react';
import { FeedbackArea, PerformanceRating, FEEDBACK_AREAS } from '../types';
import { RatingButtons } from './RatingButtons';
import { BiasAlert } from './BiasAlert';
import { detectBias, calculateObjectivityScore } from '../utils/biasDetection';

interface FeedbackFormProps {
  feedbackAreas: FeedbackArea[];
  onFeedbackChange: (areas: FeedbackArea[]) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedbackAreas, onFeedbackChange }) => {
  const [realTimeBias, setRealTimeBias] = useState<any[]>([]);

  const updateFeedbackArea = (id: string, field: 'content' | 'rating', value: string | PerformanceRating) => {
    const updatedAreas = feedbackAreas.map(area => 
      area.id === id ? { ...area, [field]: value } : area
    );
    onFeedbackChange(updatedAreas);
    
    // Real-time bias detection
    if (field === 'content') {
      const mockEvaluation = {
        id: 'temp',
        employeeName: 'Sample',
        reviewerId: 'temp',
        reviewerName: 'Temp',
        reviewPeriod: '2024',
        overallRating: 'successful' as PerformanceRating,
        feedbackAreas: updatedAreas,
        biasAnalysis: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const biasResults = detectBias(mockEvaluation);
      setRealTimeBias(biasResults);
    }
  };

  return (
    <div className="feedback-form">
      {FEEDBACK_AREAS.map(template => {
        const area = feedbackAreas.find(a => a.id === template.id) || {
          id: template.id,
          name: template.name,
          description: template.description,
          content: ''
        };

        return (
          <div key={template.id} className="card">
            <h3>{template.name}</h3>
            <p className="area-description">{template.description}</p>
            
            <div className="form-group">
              <label htmlFor={`content-${template.id}`}>Feedback:</label>
              <textarea
                id={`content-${template.id}`}
                value={area.content}
                onChange={(e) => updateFeedbackArea(template.id, 'content', e.target.value)}
                placeholder="Provide specific, objective feedback with examples and measurable outcomes..."
                rows={4}
              />
            </div>

            <div className="form-group">
              <label>Performance Rating:</label>
              <RatingButtons
                selectedRating={area.rating}
                onRatingChange={(rating) => updateFeedbackArea(template.id, 'rating', rating)}
              />
            </div>
          </div>
        );
      })}

      {realTimeBias.length > 0 && (
        <div className="card">
          <h3>Real-time Bias Analysis</h3>
          <BiasAlert biasResults={realTimeBias} />
        </div>
      )}
    </div>
  );
};