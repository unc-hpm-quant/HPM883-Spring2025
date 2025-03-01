// This is a compiled version of the quiz app (no JSX)
document.addEventListener('DOMContentLoaded', function() {
  // Create a container for the app if it doesn't exist
  let container = document.getElementById('quiz-app-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'quiz-app-container';
    document.body.appendChild(container);
  }

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

  // Build the quiz UI manually (without JSX)
  function buildQuizUI() {
    // Clear existing content
    container.innerHTML = '';

    // Create title
    const title = document.createElement('h1');
    title.className = 'quiz-title';
    title.textContent = 'HPM 883 Quiz Generator';
    container.appendChild(title);

    // Create settings section
    const settingsDiv = document.createElement('div');
    settingsDiv.className = 'quiz-settings';
    
    const settingsLabel = document.createElement('label');
    settingsLabel.className = 'settings-label';
    settingsLabel.textContent = 'Number of Questions: ';
    
    const select = document.createElement('select');
    select.className = 'settings-select';
    
    [3, 5].forEach(num => {
      const option = document.createElement('option');
      option.value = num;
      option.textContent = `${num} Questions`;
      select.appendChild(option);
    });
    
    settingsLabel.appendChild(select);
    settingsDiv.appendChild(settingsLabel);
    container.appendChild(settingsDiv);

    // Create questions container
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-container';
    
    // Get random questions
    const shuffledQuestions = [...questionsDatabase].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, parseInt(select.value));
    
    // Track user answers
    const userAnswers = {};
    
    // Create questions
    selectedQuestions.forEach((question, index) => {
      const questionCard = document.createElement('div');
      questionCard.className = 'question-card';
      
      const questionTitle = document.createElement('h2');
      questionTitle.className = 'question-text';
      questionTitle.textContent = `Question ${index + 1}: ${question.question}`;
      questionCard.appendChild(questionTitle);
      
      if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        question.options.forEach((option, optIndex) => {
          const optionItem = document.createElement('div');
          optionItem.className = 'option-item';
          
          const input = document.createElement('input');
          input.type = 'radio';
          input.id = `q${question.id}-opt${optIndex}`;
          input.name = `question-${question.id}`;
          input.value = option;
          input.className = 'option-input';
          input.addEventListener('change', () => {
            userAnswers[question.id] = option;
            checkAllAnswered();
          });
          
          const label = document.createElement('label');
          label.htmlFor = `q${question.id}-opt${optIndex}`;
          label.className = 'option-label';
          label.textContent = option;
          
          optionItem.appendChild(input);
          optionItem.appendChild(label);
          optionsContainer.appendChild(optionItem);
        });
        
        questionCard.appendChild(optionsContainer);
      } else {
        const shortAnswerContainer = document.createElement('div');
        shortAnswerContainer.className = 'short-answer-container';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'short-answer-input';
        textarea.placeholder = 'Type your answer here...';
        textarea.rows = 3;
        textarea.addEventListener('input', (e) => {
          userAnswers[question.id] = e.target.value;
          checkAllAnswered();
        });
        
        shortAnswerContainer.appendChild(textarea);
        questionCard.appendChild(shortAnswerContainer);
      }
      
      questionsContainer.appendChild(questionCard);
    });
    
    container.appendChild(questionsContainer);
    
    // Create submit button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.className = 'submit-button disabled';
    submitButton.disabled = true;
    submitButton.addEventListener('click', () => showResults(selectedQuestions, userAnswers));
    
    buttonContainer.appendChild(submitButton);
    container.appendChild(buttonContainer);
    
    // Function to check if all questions are answered
    function checkAllAnswered() {
      const allAnswered = selectedQuestions.every(q => 
        userAnswers[q.id] !== undefined && userAnswers[q.id] !== '');
      
      submitButton.disabled = !allAnswered;
      submitButton.className = allAnswered ? 'submit-button' : 'submit-button disabled';
    }
  }
  
  // Show results
  function showResults(questions, userAnswers) {
    // Clear container
    container.innerHTML = '';
    
    // Create results header
    const resultsHeader = document.createElement('div');
    resultsHeader.className = 'results-header';
    
    const resultsTitle = document.createElement('h2');
    resultsTitle.className = 'results-title';
    resultsTitle.textContent = 'Your Results';
    resultsHeader.appendChild(resultsTitle);
    
    // Calculate score
    let correct = 0;
    questions.forEach(question => {
      if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
        if (userAnswers[question.id] === question.correctAnswer) {
          correct++;
        }
      } else {
        const userAnswer = (userAnswers[question.id] || '').toLowerCase().trim();
        const correctAnswer = question.correctAnswer.toLowerCase();
        
        if (userAnswer && 
            (correctAnswer.includes(userAnswer) || 
             userAnswer.includes(correctAnswer) ||
             userAnswer.length > 10)) {
          correct++;
        }
      }
    });
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    
    const scoreText = document.createElement('p');
    scoreText.className = 'score-text';
    scoreText.textContent = `You scored: ${correct} out of ${questions.length} (${Math.round((correct / questions.length) * 100)}%)`;
    
    scoreDisplay.appendChild(scoreText);
    resultsHeader.appendChild(scoreDisplay);
    container.appendChild(resultsHeader);
    
    // Display detailed results
    const resultsDetails = document.createElement('div');
    resultsDetails.className = 'results-details';
    
    questions.forEach((question, index) => {
      // Determine if answer was correct
      let isCorrect = false;
      if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
        isCorrect = userAnswers[question.id] === question.correctAnswer;
      } else {
        const userAnswer = (userAnswers[question.id] || '').toLowerCase().trim();
        const correctAnswer = question.correctAnswer.toLowerCase();
        isCorrect = userAnswer && 
          (correctAnswer.includes(userAnswer) || 
           userAnswer.includes(correctAnswer) ||
           userAnswer.length > 10);
      }
      
      const resultCard = document.createElement('div');
      resultCard.className = isCorrect ? 'result-card correct' : 'result-card incorrect';
      
      const questionText = document.createElement('h2');
      questionText.className = 'question-text';
      questionText.textContent = `Question ${index + 1}: ${question.question}`;
      resultCard.appendChild(questionText);
      
      const answerComparison = document.createElement('div');
      answerComparison.className = 'answer-comparison';
      
      if (question.type === QUESTION_TYPES.MULTIPLE_CHOICE) {
        const userAnswerP = document.createElement('p');
        userAnswerP.className = 'user-answer';
        userAnswerP.textContent = `Your answer: ${userAnswers[question.id] || '(No answer provided)'}`;
        
        const correctAnswerP = document.createElement('p');
        correctAnswerP.className = 'correct-answer';
        correctAnswerP.textContent = `Correct answer: ${question.correctAnswer}`;
        
        answerComparison.appendChild(userAnswerP);
        answerComparison.appendChild(correctAnswerP);
      } else {
        const userAnswerDiv = document.createElement('div');
        userAnswerDiv.className = 'user-answer';
        
        const userAnswerLabel = document.createElement('p');
        userAnswerLabel.className = 'answer-label';
        userAnswerLabel.textContent = 'Your answer:';
        userAnswerDiv.appendChild(userAnswerLabel);
        
        const userAnswerText = document.createElement('p');
        userAnswerText.className = 'answer-text';
        userAnswerText.textContent = userAnswers[question.id] || '(No answer provided)';
        userAnswerDiv.appendChild(userAnswerText);
        
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.className = 'correct-answer';
        
        const correctAnswerLabel = document.createElement('p');
        correctAnswerLabel.className = 'answer-label';
        correctAnswerLabel.textContent = 'Correct answer:';
        correctAnswerDiv.appendChild(correctAnswerLabel);
        
        const correctAnswerText = document.createElement('p');
        correctAnswerText.className = 'answer-text';
        correctAnswerText.textContent = question.correctAnswer;
        correctAnswerDiv.appendChild(correctAnswerText);
        
        answerComparison.appendChild(userAnswerDiv);
        answerComparison.appendChild(correctAnswerDiv);
      }
      
      resultCard.appendChild(answerComparison);
      
      const explanation = document.createElement('div');
      explanation.className = 'explanation';
      
      const explanationLabel = document.createElement('p');
      explanationLabel.className = 'explanation-label';
      explanationLabel.textContent = 'Explanation:';
      explanation.appendChild(explanationLabel);
      
      const explanationText = document.createElement('p');
      explanationText.className = 'explanation-text';
      explanationText.textContent = question.explanation;
      explanation.appendChild(explanationText);
      
      resultCard.appendChild(explanation);
      resultsDetails.appendChild(resultCard);
    });
    
    container.appendChild(resultsDetails);
    
    // Add "New Quiz" button
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    
    const newQuizButton = document.createElement('button');
    newQuizButton.textContent = 'Generate New Quiz';
    newQuizButton.className = 'new-quiz-button';
    newQuizButton.addEventListener('click', buildQuizUI);
    
    buttonContainer.appendChild(newQuizButton);
    container.appendChild(buttonContainer);
  }
  
  // Initialize the quiz
  buildQuizUI();
});
