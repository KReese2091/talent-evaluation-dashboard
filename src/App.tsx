import React, { useState, useEffect } from 'react';
import { PerformanceEvaluation, FeedbackArea, PerformanceRating, FEEDBACK_AREAS } from './types';
import { FeedbackForm } from './components/FeedbackForm';
import { RatingButtons } from './components/RatingButtons';
import { BiasAlert } from './components/BiasAlert';
import { detectBias, calculateObjectivityScore } from './utils/biasDetection';
import { saveEvaluation, getEvaluations, deleteEvaluation, getEvaluationMetrics } from './utils/storage';

function App() {
  const [currentEvaluation, setCurrentEvaluation] = useState<PerformanceEvaluation | null>(null);
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'dashboard'>('create');

  useEffect(() => {
    setEvaluations(getEvaluations());
  }, []);

  const createNewEvaluation = () => {
    const newEvaluation: PerformanceEvaluation = {
      id: Date.now().toString(),
      employeeName: '',
      reviewerId: '',
      reviewerName: '',
      reviewPeriod: 'FY26',
      overallRating: 'successful',
      feedbackAreas: FEEDBACK_AREAS.map(area => ({
        id: area.id,
        name: area.name,
        description: area.description,
        content: ''
      })),
      biasAnalysis: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setCurrentEvaluation(newEvaluation);
  };

  const handleSaveEvaluation = () => {
    if (!currentEvaluation) return;

    // Run bias analysis
    const biasResults = detectBias(currentEvaluation);
    const updatedEvaluation = {
      ...currentEvaluation,
      biasAnalysis: biasResults,
      updatedAt: new Date()
    };

    saveEvaluation(updatedEvaluation);
    setEvaluations(getEvaluations());
    setCurrentEvaluation(null);
  };

  const handleFeedbackChange = (areas: FeedbackArea[]) => {
    if (!currentEvaluation) return;
    setCurrentEvaluation({
      ...currentEvaluation,
      feedbackAreas: areas
    });
  };

  const handleBasicInfoChange = (field: string, value: string | PerformanceRating) => {
    if (!currentEvaluation) return;
    setCurrentEvaluation({
      ...currentEvaluation,
      [field]: value
    });
  };

  const metrics = getEvaluationMetrics();

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Talent Evaluation Dashboard</h1>
        <p>Performance Assessment & Bias Detection</p>
      </header>

      <nav style={{ marginBottom: '30px' }}>
        <div className="btn-group" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            className={`btn ${activeTab === 'create' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('create')}
          >
            Performance Evaluation
          </button>
          <button
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard & Analytics
          </button>
        </div>
      </nav>

      {activeTab === 'create' && (
        <div>
          {!currentEvaluation ? (
            (() => {
              createNewEvaluation();
              return null;
            })()
          ) : (
            <div>
              <div className="card">
                <h2>Basic Information</h2>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label>Employee Name:</label>
                    <input
                      type="text"
                      value={currentEvaluation.employeeName}
                      onChange={(e) => handleBasicInfoChange('employeeName', e.target.value)}
                      placeholder="Enter employee name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Reviewer Name:</label>
                    <input
                      type="text"
                      value={currentEvaluation.reviewerName}
                      onChange={(e) => handleBasicInfoChange('reviewerName', e.target.value)}
                      placeholder="Enter reviewer name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Fiscal Year:</label>
                    <select
                      value={currentEvaluation.reviewPeriod}
                      onChange={(e) => handleBasicInfoChange('reviewPeriod', e.target.value)}
                    >
                      <option value="FY26">FY26</option>
                      <option value="FY25">FY25</option>
                      <option value="FY24">FY24</option>
                      <option value="FY23">FY23</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="card">
                <h2>Overall Performance Rating</h2>
                <RatingButtons
                  selectedRating={currentEvaluation.overallRating}
                  onRatingChange={(rating) => handleBasicInfoChange('overallRating', rating)}
                />
              </div>

              <FeedbackForm
                feedbackAreas={currentEvaluation.feedbackAreas}
                onFeedbackChange={handleFeedbackChange}
              />

              <div className="card">
                <h2>Feedback Quality Analysis</h2>
                <BiasAlert biasResults={detectBias(currentEvaluation)} />
                
                <div style={{ marginTop: '20px' }}>
                  <strong>Objectivity Score: {Math.round(calculateObjectivityScore(currentEvaluation))}%</strong>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${calculateObjectivityScore(currentEvaluation)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ textAlign: 'center' }}>
                <button 
                  className="btn btn-primary" 
                  onClick={handleSaveEvaluation}
                  disabled={!currentEvaluation.employeeName || !currentEvaluation.reviewerName}
                >
                  Complete & Save Evaluation
                </button>
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setCurrentEvaluation(null)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-3">
            <div className="card">
              <h3>Total Evaluations</h3>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007acc' }}>
                {metrics.totalEvaluations}
              </div>
            </div>
            
            <div className="card">
              <h3>Rating Distribution</h3>
              <div>
                <div>Exemplary: {metrics.ratingDistribution.exemplary}</div>
                <div>Successful: {metrics.ratingDistribution.successful}</div>
                <div>Opportunity: {metrics.ratingDistribution.opportunity}</div>
              </div>
            </div>
            
            <div className="card">
              <h3>Bias Frequency</h3>
              {Object.entries(metrics.biasFrequency).map(([bias, count]) => (
                <div key={bias}>
                  {bias.replace('_', ' ')}: {count}
                </div>
              ))}
            </div>
          </div>

            <div className="card">
            <h2>Evaluation History</h2>
            {evaluations.length === 0 ? (
              <p>No evaluations completed yet. Start your first evaluation using the "New Evaluation" tab.</p>
            ) : (
              <div className="evaluation-list">
                {evaluations.map(evaluation => (
                  <div key={evaluation.id} className="evaluation-item" style={{ 
                    border: '1px solid #ddd', 
                    padding: '15px', 
                    marginBottom: '10px', 
                    borderRadius: '4px' 
                  }}>
                    <h4>{evaluation.employeeName}</h4>
                    <p>Reviewer: {evaluation.reviewerName}</p>
                    <p>Period: {evaluation.reviewPeriod}</p>
                    <p>Overall Rating: <span className={`rating-${evaluation.overallRating}`}>
                      {evaluation.overallRating}
                    </span></p>
                    <p>Bias Alerts: {evaluation.biasAnalysis.length}</p>
                    <p>Objectivity Score: {Math.round(calculateObjectivityScore(evaluation))}%</p>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => deleteEvaluation(evaluation.id)}
                      style={{ marginTop: '10px' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;