import { BiasDetectionResult, PerformanceEvaluation, PerformanceRating } from '../types';

// Keywords and patterns that indicate potential bias
const BIAS_PATTERNS = {
  easy_rater: {
    keywords: ['nice', 'friendly', 'pleasant', 'easy to work with', 'gets along well', 'likeable', 'popular', 'sweet', 'kind', 'wonderful person'],
    phrases: ['everyone likes', 'well-liked', 'team favorite', 'pleasure to work with', 'great personality', 'really nice person'],
    severity: 'medium' as const
  },
  hard_rater: {
    keywords: ['never', 'always fails', 'impossible', 'cannot', 'incapable', 'worthless', 'terrible', 'awful', 'disaster'],
    phrases: ['no one can', 'expects perfection', 'sets impossible standards', 'never good enough', 'always finds fault'],
    severity: 'high' as const
  },
  halo_effect: {
    keywords: ['exceptional in every way', 'perfect', 'flawless', 'outstanding at everything'],
    phrases: ['excels at everything', 'no weaknesses', 'perfect performer'],
    severity: 'high' as const
  },
  recency_bias: {
    keywords: ['recently', 'last month', 'just completed', 'latest project'],
    phrases: ['most recent work', 'just finished', 'recent success'],
    severity: 'medium' as const
  },
  similarity_bias: {
    keywords: ['thinks like me', 'similar background', 'same approach', 'my style'],
    phrases: ['reminds me of myself', 'similar mindset', 'shares my values'],
    severity: 'high' as const
  },
  attribution_bias: {
    keywords: ['lucky', 'fortunate', 'good timing', 'easy project'],
    phrases: ['got lucky', 'right place right time', 'had help'],
    severity: 'medium' as const
  }
};

const SUBJECTIVE_INDICATORS = [
  'feel', 'think', 'believe', 'seems', 'appears', 'probably', 'maybe', 'might'
];

const OBJECTIVE_INDICATORS = [
  'achieved', 'delivered', 'completed', 'increased', 'decreased', 'improved', 'measured', 'resulted in'
];

export function detectBias(evaluation: PerformanceEvaluation): BiasDetectionResult[] {
  const results: BiasDetectionResult[] = [];
  
  // Analyze all feedback content
  const allContent = evaluation.feedbackAreas.map(area => area.content).join(' ').toLowerCase();
  
  // Check for each bias type
  Object.entries(BIAS_PATTERNS).forEach(([biasType, pattern]) => {
    const keywordMatches = pattern.keywords.filter(keyword => 
      allContent.includes(keyword.toLowerCase())
    );
    
    const phraseMatches = pattern.phrases.filter(phrase => 
      allContent.includes(phrase.toLowerCase())
    );
    
    if (keywordMatches.length > 0 || phraseMatches.length > 0) {
      results.push({
        type: biasType as any,
        severity: pattern.severity,
        message: getBiasMessage(biasType as any, keywordMatches, phraseMatches),
        suggestions: getBiasSuggestions(biasType as any)
      });
    }
  });
  
  // Check for Easy Rater pattern specifically
  const easyRaterResult = detectEasyRaterBias(evaluation);
  if (easyRaterResult) {
    results.push(easyRaterResult);
  }
  
  return results;
}

function detectEasyRaterBias(evaluation: PerformanceEvaluation): BiasDetectionResult | null {
  const ratings = evaluation.feedbackAreas.filter(area => area.rating).map(area => area.rating);
  const allContent = evaluation.feedbackAreas.map(area => area.content).join(' ').toLowerCase();
  
  // Check if all ratings are high but content lacks specific examples
  const highRatings = ratings.filter(rating => rating === 'exemplary' || rating === 'successful').length;
  const totalRatings = ratings.length;
  
  // Check for vague positive language without specifics
  const vaguePositives = ['good', 'great', 'nice', 'fine', 'okay', 'well', 'positive'].filter(word =>
    allContent.includes(word)
  );
  
  const specificExamples = ['achieved', 'delivered', 'increased by', 'completed', 'resulted in'].filter(phrase =>
    allContent.includes(phrase)
  );
  
  // Easy Rater detected if: high ratings but vague feedback with few specific examples
  if (totalRatings > 0 && highRatings / totalRatings > 0.7 && vaguePositives.length > 2 && specificExamples.length < 2) {
    return {
      type: 'easy_rater',
      severity: 'high',
      message: 'Potential Easy Rater bias detected: High ratings with vague, non-specific feedback that avoids pointing out specific areas for improvement.',
      suggestions: [
        'Provide specific examples and measurable outcomes',
        'Include at least one area for development or growth',
        'Use objective metrics and data points',
        'Focus on business impact and results rather than personality traits'
      ]
    };
  }
  
  return null;
}

export function calculateObjectivityScore(evaluation: PerformanceEvaluation): number {
  const allContent = evaluation.feedbackAreas.map(area => area.content).join(' ').toLowerCase();
  
  const subjectiveCount = SUBJECTIVE_INDICATORS.filter(indicator => 
    allContent.includes(indicator)
  ).length;
  
  const objectiveCount = OBJECTIVE_INDICATORS.filter(indicator => 
    allContent.includes(indicator)
  ).length;
  
  const totalWords = allContent.split(' ').length;
  const biasCount = detectBias(evaluation).length;
  
  // Calculate score based on objective language usage and bias absence
  let score = 50; // Base score
  
  // Add points for objective language
  score += Math.min((objectiveCount / totalWords) * 1000, 30);
  
  // Subtract points for subjective language
  score -= Math.min((subjectiveCount / totalWords) * 1000, 20);
  
  // Subtract points for detected bias
  score -= biasCount * 10;
  
  return Math.max(0, Math.min(100, score));
}

function getBiasMessage(biasType: string, keywordMatches: string[], phraseMatches: string[]): string {
  const matches = [...keywordMatches, ...phraseMatches];
  
  switch (biasType) {
    case 'easy_rater':
      return `Easy Rater bias detected. Found language suggesting personal preference rather than performance: ${matches.join(', ')}`;
    case 'halo_effect':
      return `Halo Effect bias detected. Language suggests everything is perfect: ${matches.join(', ')}`;
    case 'recency_bias':
      return `Recency bias detected. Focus on recent events: ${matches.join(', ')}`;
    case 'similarity_bias':
      return `Similarity bias detected. Language suggests preference based on similarities: ${matches.join(', ')}`;
    case 'attribution_bias':
      return `Attribution bias detected. Success attributed to luck rather than skill: ${matches.join(', ')}`;
    default:
      return `Potential bias detected: ${matches.join(', ')}`;
  }
}

function getBiasSuggestions(biasType: string): string[] {
  switch (biasType) {
    case 'easy_rater':
      return [
        'Focus on specific business outcomes and measurable results',
        'Include areas for development and improvement',
        'Use objective metrics rather than personality descriptions',
        'Provide concrete examples of work performance'
      ];
    case 'halo_effect':
      return [
        'Evaluate each performance area independently',
        'Identify at least one area for growth or development',
        'Focus on specific skills and competencies',
        'Avoid generalizations about overall performance'
      ];
    case 'recency_bias':
      return [
        'Review performance across the entire evaluation period',
        'Include examples from different time periods',
        'Weight recent and earlier achievements appropriately',
        'Consider patterns and consistency over time'
      ];
    case 'similarity_bias':
      return [
        'Focus on job-relevant skills and performance',
        'Consider diverse approaches and working styles as strengths',
        'Evaluate based on role requirements, not personal preferences',
        'Seek input from multiple perspectives'
      ];
    case 'attribution_bias':
      return [
        'Acknowledge the associate\'s skills and efforts in achievements',
        'Consider both internal factors (effort, skill) and external factors',
        'Give credit for problem-solving and adaptability',
        'Focus on how they contributed to successful outcomes'
      ];
    default:
      return ['Review feedback for objectivity and specificity'];
  }
}