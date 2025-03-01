import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';

// Define question types and their structure
const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWER: 'SHORT_ANSWER'
};

// Question database - expand with more questions from your lecture notes
const questionsDatabase = [
  {
    id: 1,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the cornerstone of experimental design, crucial for establishing a causal relationship?',
    options: [
      'External validity',
      'Internal validity',
      'Statistical power',
      'Regression analysis'
    ],
    correctAnswer: 'Internal validity',
    explanation: 'Internal validity ensures that observed effects in an experiment can be confidently attributed to the treatment rather than other confounding factors.'
  },
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What framework is useful for understanding causal inference as a missing data problem?',
    options: [
      'Machine Learning Framework',
      'Potential Outcomes Framework',
      'SUTVA Framework',
      'Observational Data Framework'
    ],
    correctAnswer: 'Potential Outcomes Framework',
    explanation: 'The Potential Outcomes Framework is a way to formally think about counterfactuals and causal inference, viewing causal inference as a missing data problem.'
  },
  {
    id: 3,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In experimental design, what is MDE an abbreviation for?',
    options: [
      'Maximal Design Efficiency',
      'Multiple Data Elements',
      'Minimum Detectable Effect',
      'Mean Difference Estimator'
    ],
    correctAnswer: 'Minimum Detectable Effect',
    explanation: 'The Minimum Detectable Effect (MDE) is the smallest true effect size that can be detected with specified level of statistical power.'
  },
  {
    id: 4,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What assignment mechanism is considered a "gold standard" for estimating causal effects?',
    options: [
      'Self-selection',
      'Convenience sampling',
      'Randomization',
      'Stratification'
    ],
    correctAnswer: 'Randomization',
    explanation: 'Randomization is often referred to as the "gold standard" for estimating causal effects because it ensures that assignment is independent of individual characteristics, eliminating bias.'
  },
  {
    id: 5, 
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Briefly explain what is meant by the "Fundamental Problem of Causal Inference".',
    correctAnswer: "We cannot observe both potential outcomes (treated and untreated) for the same individual simultaneously.",
    explanation: 'The Fundamental Problem of Causal Inference is that we never observe what would have happened to an individual if the alternative action had been applied - we can\'t simultaneously observe both treatment and control outcomes for the same unit.'
  },
  {
    id: 6,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Name two of the four key exclusion restrictions that must be satisfied for an experiment to be valid.',
    correctAnswer: 'Any two of: SUTVA (Stable Unit Treatment Value Assumption), Observability, Complete Compliance, Statistical Independence',
    explanation: 'The four key exclusion restrictions are: 1) SUTVA (treatment of one individual must not affect another\'s outcomes), 2) Observability (outcomes must be observed for all individuals), 3) Complete Compliance (those assigned to treatment must receive it, and control must not), and 4) Statistical Independence (treatment assignment is independent of potential outcomes).'
  },
  {
    id: 7,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the optimal allocation of sample between treatment and control groups when variances are equal and costs are the same?',
    options: [
      '25% treatment, 75% control',
      '75% treatment, 25% control',
      '50% treatment, 50% control',
      'Depends on the specific hypothesis'
    ],
    correctAnswer: '50% treatment, 50% control',
    explanation: 'With equal variances and no cost differences, the classic result is to have a 50-50 split between treatment and control groups to minimize the variance of the estimated treatment effect.'
  },
  {
    id: 8,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the primary difference between Type I and Type II errors?',
    options: [
      'Type I errors are more serious than Type II errors',
      'Type I error is rejecting a true null hypothesis; Type II is failing to reject a false null',
      'Type I errors occur in lab settings; Type II errors occur in field experiments',
      'Type I errors relate to internal validity; Type II errors relate to external validity'
    ],
    correctAnswer: 'Type I error is rejecting a true null hypothesis; Type II is failing to reject a false null',
    explanation: 'Type I error (false positive) occurs when we reject a null hypothesis that is actually true. Type II error (false negative) occurs when we fail to reject a null hypothesis that is actually false.'
  },
  {
    id: 9,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What does the acronym SUTVA stand for, and why is it important in experimental design?',
    correctAnswer: 'Stable Unit Treatment Value Assumption; it ensures that treatment of one unit does not affect outcomes of others',
    explanation: 'SUTVA stands for Stable Unit Treatment Value Assumption. It is crucial because it specifies that the treatment of one individual must not affect another\'s outcomes. Violations of SUTVA (such as spillovers) can compromise the validity of the experiment.'
  },
  {
    id: 10,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the relationship between statistical power and sample size in an experiment?',
    options: [
      'Power decreases as sample size increases',
      'Power increases as sample size increases',
      'Power and sample size are unrelated',
      'Power is constant regardless of sample size'
    ],
    correctAnswer: 'Power increases as sample size increases',
    explanation: 'As sample size increases, statistical power increases, making it more likely to detect a true effect if one exists. This is because larger samples reduce variability in estimates.'
  }
];

export const QuizApp = () => {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [questionsToShow, setQuestionsToShow] = useState(5);
  
  // Setup quiz with random questions when component mounts or when questionsToShow changes
  useEffect(() => {
    generateRandomQuestions();
  }, [questionsToShow]);
  
  // Generate a set of random questions from the database
  const generateRandomQuestions = () => {
    // Shuffle all questions and take the first N (where N = questionsToShow)
    const shuffledQuestions = shuffle([...questionsDatabase]);
    const selectedQuestions = shuffledQuestions.slice(0, questionsToShow);
    
    setCurrentQuestions(selectedQuestions);
    setUserAnswers({});
    setShowResults(false);
  };
  
  // Handle change in multiple choice selection
  const handleOptionSelect = (questionId, option) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: option
    });
  };
  
  // Handle change in short answer text
  const handleShortAnswerChange = (questionId, text) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: text
    });
  };
  
  // Submit quiz and show results
  const handleSubmit = () => {
    setShowResults(true);
  };
  
  // Start a new quiz
  const handleNewQuiz = () => {
    generateRandomQuestions();
  };
  
  // Check if all questions have been answered
  const allQuestionsAnswered = () => {
    return currentQuestions.every(q => userAnswers[q.id] !== undefined && 
                                        userAnswers[q.id] !== '');
  };
  
  // Calculate score
  const calculateScore = () => {
    let correctAnswers = 0;
    
    currentQuestions.forEach(question => {
      if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
        if (userAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      } else if (question.type === QUESTION_TYPES.SHORT_ANSWER) {
        // For short answer, check if the answer contains key elements from correct answer
        const userAnswer = userAnswers[question.id]?.toLowerCase().trim() || '';
        const correctAnswer = question.correctAnswer.toLowerCase();
        
        // Check if user answer contains significant portions of the correct answer
        if (userAnswer && 
            (correctAnswer.includes(userAnswer) || 
             userAnswer.includes(correctAnswer) ||
             userAnswer.length > 10)) {
          correctAnswers++;
        }
      }
    });
    
    return {
      correct: correctAnswers,
      total: currentQuestions.length,
      percentage: Math.round((correctAnswers / currentQuestions.length) * 100)
    };
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">HPM 883 Random Quiz Generator</h1>
      
      {!showResults ? (
        <>
          <div className="quiz-settings">
            <label className="settings-label">
              Number of Questions:
              <select 
                value={questionsToShow}
                onChange={(e) => setQuestionsToShow(parseInt(e.target.value))}
                className="settings-select"
              >
                <option value="3">3 Questions</option>
                <option value="5">5 Questions</option>
                <option value="10">10 Questions (All)</option>
              </select>
            </label>
          </div>
          
          <div className="questions-container">
            {currentQuestions.map((q, index) => (
              <div key={q.id} className="question-card">
                <h2 className="question-text">Question {index + 1}: {q.question}</h2>
                
                {q.type === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                  <div className="options-container">
                    {q.options.map((option, optIndex) => (
                      <div key={optIndex} className="option-item">
                        <input 
                          type="radio" 
                          id={`q${q.id}-opt${optIndex}`}
                          name={`question-${q.id}`}
                          value={option}
                          checked={userAnswers[q.id] === option}
                          onChange={() => handleOptionSelect(q.id, option)}
                          className="option-input"
                        />
                        <label htmlFor={`q${q.id}-opt${optIndex}`} className="option-label">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="short-answer-container">
                    <textarea
                      value={userAnswers[q.id] || ''}
                      onChange={(e) => handleShortAnswerChange(q.id, e.target.value)}
                      placeholder="Type your answer here..."
                      className="short-answer-input"
                      rows="3"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="button-container">
            <button
              onClick={handleSubmit}
              disabled={!allQuestionsAnswered()}
              className={allQuestionsAnswered() ? "submit-button" : "submit-button disabled"}
            >
              Submit Quiz
            </button>
          </div>
        </>
      ) : (
        <div className="results-container">
          <div className="results-header">
            <h2 className="results-title">Your Results</h2>
            
            {(() => {
              const score = calculateScore();
              return (
                <div className="score-display">
                  <p className="score-text">
                    You scored: {score.correct} out of {score.total} ({score.percentage}%)
                  </p>
                </div>
              );
            })()}
          </div>
          
          <div className="results-details">
            {currentQuestions.map((q, index) => {
              // Determine if the answer was correct
              let isCorrect = false;
              if (q.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
                isCorrect = userAnswers[q.id] === q.correctAnswer;
              } else {
                // For short answer, simplistic check
                const userAnswer = userAnswers[q.id]?.toLowerCase().trim() || '';
                const correctAnswer = q.correctAnswer.toLowerCase();
                isCorrect = userAnswer && 
                  (correctAnswer.includes(userAnswer) || 
                   userAnswer.includes(correctAnswer) ||
                   userAnswer.length > 10);
              }
              
              return (
                <div
                  key={q.id} 
                  className={isCorrect ? "result-card correct" : "result-card incorrect"}
                >
                  <h2 className="question-text">Question {index + 1}: {q.question}</h2>
                  
                  {q.type === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                    <div className="answer-comparison">
                      <p className="user-answer">Your answer: {userAnswers[q.id]}</p>
                      <p className="correct-answer">Correct answer: {q.correctAnswer}</p>
                    </div>
                  ) : (
                    <div className="answer-comparison">
                      <div className="user-answer">
                        <p className="answer-label">Your answer:</p>
                        <p className="answer-text">
                          {userAnswers[q.id] || '(No answer provided)'}
                        </p>
                      </div>
                      <div className="correct-answer">
                        <p className="answer-label">Correct answer:</p>
                        <p className="answer-text">
                          {q.correctAnswer}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="explanation">
                    <p className="explanation-label">Explanation:</p>
                    <p className="explanation-text">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="button-container">
            <button
              onClick={handleNewQuiz}
              className="new-quiz-button"
            >
              Generate New Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};