import { PerformanceEvaluation, EvaluationMetrics } from '../types';

const STORAGE_KEY = 'talent_evaluations';

export function saveEvaluation(evaluation: PerformanceEvaluation): void {
  const evaluations = getEvaluations();
  const existingIndex = evaluations.findIndex(e => e.id === evaluation.id);
  
  if (existingIndex >= 0) {
    evaluations[existingIndex] = { ...evaluation, updatedAt: new Date() };
  } else {
    evaluations.push(evaluation);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
}

export function getEvaluations(): PerformanceEvaluation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((evaluation: any) => ({
      ...evaluation,
      createdAt: new Date(evaluation.createdAt),
      updatedAt: new Date(evaluation.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading evaluations:', error);
    return [];
  }
}

export function deleteEvaluation(id: string): void {
  const evaluations = getEvaluations().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
}

export function getEvaluationMetrics(): EvaluationMetrics {
  const evaluations = getEvaluations();
  
  const ratingDistribution = {
    exemplary: 0,
    successful: 0,
    opportunity: 0
  };
  
  const biasFrequency: Record<string, number> = {};
  let totalObjectivityScore = 0;
  
  evaluations.forEach(evaluation => {
    // Count overall ratings
    if (evaluation.overallRating) {
      ratingDistribution[evaluation.overallRating]++;
    }
    
    // Count bias occurrences
    evaluation.biasAnalysis.forEach(bias => {
      biasFrequency[bias.type] = (biasFrequency[bias.type] || 0) + 1;
    });
  });
  
  return {
    totalEvaluations: evaluations.length,
    ratingDistribution,
    biasFrequency,
    objectivityScore: evaluations.length > 0 ? totalObjectivityScore / evaluations.length : 0
  };
}

export function exportEvaluations(): string {
  const evaluations = getEvaluations();
  return JSON.stringify(evaluations, null, 2);
}

export function importEvaluations(jsonData: string): boolean {
  try {
    const evaluations = JSON.parse(jsonData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    return true;
  } catch (error) {
    console.error('Error importing evaluations:', error);
    return false;
  }
}