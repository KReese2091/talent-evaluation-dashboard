import React from 'react';
import { BiasDetectionResult } from '../types';

interface BiasAlertProps {
  biasResults: BiasDetectionResult[];
}

export const BiasAlert: React.FC<BiasAlertProps> = ({ biasResults }) => {
  if (biasResults.length === 0) {
    return (
      <div className="bias-alert info">
        <strong>✓ Feedback Quality: Good</strong>
        <p>Your feedback appears objective and focused on specific performance outcomes.</p>
      </div>
    );
  }

  return (
    <div className="bias-alerts">
      {biasResults.map((bias, index) => (
        <div key={index} className={`bias-alert ${bias.severity === 'high' ? '' : 'warning'}`}>
          <strong>⚠️ {getBiasTitle(bias.type)} Detected</strong>
          <p>{bias.message}</p>
          <div className="bias-suggestions">
            <strong>Suggestions:</strong>
            <ul>
              {bias.suggestions.map((suggestion, i) => (
                <li key={i}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

function getBiasTitle(biasType: string): string {
  switch (biasType) {
    case 'easy_rater':
      return 'Easy Rater Bias';
    case 'halo_effect':
      return 'Halo Effect';
    case 'recency_bias':
      return 'Recency Bias';
    case 'similarity_bias':
      return 'Similarity Bias';
    case 'attribution_bias':
      return 'Attribution Bias';
    default:
      return 'Potential Bias';
  }
}