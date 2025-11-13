export type PerformanceRating = 'exemplary' | 'successful' | 'opportunity';

export interface FeedbackArea {
  id: string;
  name: string;
  description: string;
  content: string;
  rating?: PerformanceRating;
}

export interface BiasDetectionResult {
  type: 'easy_rater' | 'halo_effect' | 'recency_bias' | 'similarity_bias' | 'attribution_bias';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestions: string[];
}

export interface PerformanceEvaluation {
  id: string;
  employeeName: string;
  reviewerId: string;
  reviewerName: string;
  reviewPeriod: string;
  overallRating: PerformanceRating;
  feedbackAreas: FeedbackArea[];
  comprehensiveSummary: string;
  biasAnalysis: BiasDetectionResult[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EvaluationMetrics {
  totalEvaluations: number;
  ratingDistribution: Record<PerformanceRating, number>;
  biasFrequency: Record<string, number>;
  objectivityScore: number;
}

export const FEEDBACK_AREAS = [
  {
    id: 'key_priorities',
    name: 'Key Priorities',
    description: 'What were the associate\'s main goals or deliverables this year?'
  },
  {
    id: 'results_impact',
    name: 'Results & Impact',
    description: 'What outcomes did they drive, and how did they move the business or brand forward?'
  },
  {
    id: 'collaboration_influence',
    name: 'Collaboration & Influence',
    description: 'How did they partner across teams or functions to deliver results?'
  },
  {
    id: 'growth_development',
    name: 'Growth & Development',
    description: 'What new skills, behaviors, or leadership qualities did they build this year?'
  },
  {
    id: 'looking_ahead',
    name: 'Looking Ahead',
    description: 'What are their biggest opportunities and development areas to grow next year?'
  }
] as const;

export const PERFORMANCE_RATINGS = {
  exemplary: {
    label: 'Exemplary',
    description: 'Performance consistently exceeds the requirements of the role. Far above range of typical, successful associates in similar roles.'
  },
  successful: {
    label: 'Successful',
    description: 'Performance consistently meets the requirements of the role. In the range of typical, successful associates in similar roles.'
  },
  opportunity: {
    label: 'Opportunity',
    description: 'Performance consistently failed to meet the requirements of the role. Significantly below the range of typical, successful associates in similar roles.'
  }
} as const;