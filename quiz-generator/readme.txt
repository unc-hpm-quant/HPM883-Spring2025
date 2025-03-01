# HPM 883 Quiz Generator

A random quiz generator for HPM 883 that creates interactive quizzes from lecture content.

## Overview

This application:
- Generates random quizzes from a bank of course-specific questions
- Supports both multiple choice and short answer questions
- Lets students test their knowledge with immediate feedback
- Tracks scores and provides explanations

## Files Structure

- `index.qmd`: Main Quarto document that loads the quiz application
- `quiz-app.jsx`: React component implementing the quiz functionality
- `styles.css`: Styling for the quiz interface
- `question-manager.js`: Helper for adding/managing questions

## Setup Instructions

1. Make sure you have Quarto installed (https://quarto.org/docs/get-started/)
2. Place these files in your Quarto website project
3. Add any necessary dependencies to your _quarto.yml file

```yaml
# In _quarto.yml
format:
  html:
    include-in-header:
      - text: |
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/lodash@4.17.21/lodash.min.js"></script>
```

4. Render your website with `quarto render`

## Adding More Questions

To add questions based on your lecture content:

1. Open `quiz-app.jsx` and find the `questionsDatabase` array
2. Add new questions following the existing format:

```javascript
// For multiple choice
{
  id: [unique_number],
  type: QUESTION_TYPES.MULTIPLE_CHOICE,
  question: "Your question text here?",
  options: [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4"
  ],
  correctAnswer: "Option 2",
  explanation: "Explanation of why Option 2 is correct."
}

// For short answer
{
  id: [unique_number],
  type: QUESTION_TYPES.SHORT_ANSWER,
  question: "Your short answer question here?",
  correctAnswer: "Expected answer or key points",
  explanation: "Detailed explanation of the correct answer."
}
```

Alternatively, use the helper functions in `question-manager.js` to create new questions.

## Customization

- Modify `styles.css` to change colors, spacing, and layout
- Adjust the quiz settings in `quiz-app.jsx` to change the number of questions or scoring algorithm
- Consider categorizing questions by topic by adding a topic field to each question

## License

This project is educational content related to HPM 883 course.