/**
 * Question Manager - Add and manage questions for the HPM 883 Quiz Generator
 * 
 * Instructions for adding more questions:
 * 1. Follow the format below for either Multiple Choice or Short Answer questions
 * 2. Add your new question to the questionsDatabase array
 * 3. Make sure each question has a unique ID
 */

// Define question types
const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWER: 'SHORT_ANSWER'
};

// Template for creating a new multiple choice question
function createMultipleChoiceQuestion(id, questionText, options, correctAnswer, explanation) {
  return {
    id: id,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: questionText,
    options: options,
    correctAnswer: correctAnswer,
    explanation: explanation
  };
}

// Template for creating a new short answer question
function createShortAnswerQuestion(id, questionText, correctAnswer, explanation) {
  return {
    id: id,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: questionText,
    correctAnswer: correctAnswer,
    explanation: explanation
  };
}

// Example - Creating a new multiple choice question
const newMultipleChoiceQuestion = createMultipleChoiceQuestion(
  11, // unique ID
  'When the unit of randomization is the clinic instead of the individual, what happens to statistical power?',
  [
    'Power increases',
    'Power decreases',
    'Power remains the same',
    'Power could either increase or decrease depending on the ICC'
  ],
  'Power decreases',
  'When randomizing at the clinic level rather than individual level, statistical power typically decreases due to intracluster correlation (ICC). Patients within the same clinic tend to be more similar, effectively reducing the amount of independent information.'
);

// Example - Creating a new short answer question
const newShortAnswerQuestion = createShortAnswerQuestion(
  12, // unique ID
  'What is the formula for calculating the Minimum Detectable Effect (MDE) in a clustered design?',
  'MDE = (z_{1-α/2} + z_{1-β}) × √[(1 + (m-1)ρ) × σ²/n]',
  'The formula includes: critical values for significance (z_{1-α/2}) and power (z_{1-β}), the design effect [1 + (m-1)ρ] where m is cluster size and ρ is ICC, variance (σ²), and sample size (n).'
);

/**
 * To add these questions to your quiz:
 * 1. Import this file in quiz-app.jsx
 * 2. Add the new questions to the questionsDatabase array:
 *    questionsDatabase.push(newMultipleChoiceQuestion, newShortAnswerQuestion);
 */

// Export these functions if you want to use them in other files
export {
  QUESTION_TYPES,
  createMultipleChoiceQuestion,
  createShortAnswerQuestion
};
