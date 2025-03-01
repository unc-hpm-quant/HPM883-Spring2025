// Define question types
const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWER: 'SHORT_ANSWER'
};

// Question database
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
  }
];

// Export the constants and database for use in other files
// This won't be used in the direct script tag inclusion, but it's good practice
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    QUESTION_TYPES,
    questionsDatabase
  };
}
