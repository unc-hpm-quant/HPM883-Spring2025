// Define question types
const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SHORT_ANSWER: 'SHORT_ANSWER',
  CODE_EXPLANATION: 'CODE_EXPLANATION',
  CODE_CORRECTION: 'CODE_CORRECTION',
  RESEARCH_DESIGN_CRITIQUE: 'RESEARCH_DESIGN_CRITIQUE',
  STUDY_VIGNETTE_CRITIQUE: 'STUDY_VIGNETTE_CRITIQUE',
  COUNTERFACTUAL_REASONING: 'COUNTERFACTUAL_REASONING',
  STATISTICAL_INTERPRETATION: 'STATISTICAL_INTERPRETATION',
  METHOD_SELECTION: 'METHOD_SELECTION'
};

// Question database
const questionsDatabase = [
  {
    id: 1,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the fundamental tradeoff faced as model complexity increases in machine learning?',
    options: [
      'Computation time versus accuracy',
      'Approximation error decreases while estimation error increases',
      'Bias increases while variance decreases',
      'Training error increases while test error decreases'
    ],
    correctAnswer: 'Approximation error decreases while estimation error increases',
    explanation: 'As model complexity increases, we face two competing forces: approximation error decreases as we better capture the true underlying function, but estimation error increases as we begin to fit noise in our training data. This creates the bias-variance tradeoff that defines machine learning.'
  },
  
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the main advantage of the LASSO regression compared to standard OLS regression?',
    options: [
      'It always produces lower prediction error',
      'It performs automatic variable selection',
      'It handles categorical variables better',
      'It requires less computational resources'
    ],
    correctAnswer: 'It performs automatic variable selection',
    explanation: 'The key advantage of LASSO is that it performs automatic variable selection. Due to the L1 penalty\'s diamond shape, solutions often occur at corners where some coefficients equal zero, effectively removing these variables from the model.'
  },
  
  {
    id: 3,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In tree-based methods, what does pruning aim to accomplish?',
    options: [
      'Increase the depth of the tree to improve accuracy',
      'Remove unnecessary branches to prevent overfitting',
      'Add more leaves to capture complex patterns',
      'Combine multiple trees into one larger tree'
    ],
    correctAnswer: 'Remove unnecessary branches to prevent overfitting',
    explanation: 'Pruning aims to simplify a tree by removing unnecessary branches to prevent overfitting. This is done through cost-complexity pruning with a penalty for tree complexity, which helps find the right-sized tree that balances complexity and predictive performance.'
  },
  
  {
    id: 4,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What distinguishes random forests from bagged trees?',
    options: [
      'Random forests use pruning while bagging does not',
      'Random forests consider only a random subset of predictors at each split',
      'Random forests use different data for each tree',
      'Random forests only work for classification problems'
    ],
    correctAnswer: 'Random forests consider only a random subset of predictors at each split',
    explanation: 'Random forests address a weakness of bagging (high correlation between trees) by considering only a random subset of predictors at each split. Typically, m ≈ √p for classification and m ≈ p/3 for regression. This decorrelates the trees, further reducing variance.'
  },
  
  {
    id: 5,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the core idea behind gradient boosting algorithms?',
    options: [
      'Averaging many independent tree predictions',
      'Sequential tree building where each tree focuses on errors of previous trees',
      'Creating deeper trees to capture more complex patterns',
      'Using regularization to penalize complex trees'
    ],
    correctAnswer: 'Sequential tree building where each tree focuses on errors of previous trees',
    explanation: 'Unlike bagging/random forests (which build trees in parallel), boosting fits trees sequentially. Each tree focuses on the errors of previous trees, essentially building an additive model of trees. This allows the algorithm to improve its predictions by learning from previous mistakes.'
  },
  
  {
    id: 6,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In the potential outcomes framework, what is the fundamental problem of causal inference?',
    options: [
      'Treatments are never truly random in practice',
      'We only observe one potential outcome for each unit',
      'Sample sizes are usually too small for valid inference',
      'Unmeasured variables always confound treatment effects'
    ],
    correctAnswer: 'We only observe one potential outcome for each unit',
    explanation: 'The fundamental problem of causal inference is that we only observe one potential outcome for each unit. We observe Y_i(1) for treated units and Y_i(0) for control units, but never both for the same unit, making it impossible to directly observe individual treatment effects.'
  },
  
  {
    id: 7,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the role of the ANCOVA specification in randomized trials?',
    options: [
      'To make the treatment effect unbiased',
      'To reduce variance and improve precision of treatment effect estimates',
      'To test for baseline imbalances between treatment and control groups',
      'To adjust for selection bias in the randomization process'
    ],
    correctAnswer: 'To reduce variance and improve precision of treatment effect estimates',
    explanation: 'In randomized trials, ANCOVA (controlling for baseline covariates) is used primarily to improve precision and reduce variance of treatment effect estimates, not to remove bias. The treatment effect is already unbiased due to randomization, but adding baseline controls, especially the baseline outcome, can substantially improve precision.'
  },
  
  {
    id: 8,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the primary purpose of the second step in Post-Double Selection (PDS) Lasso for randomized trials?',
    options: [
      'To directly improve precision of treatment effect estimates',
      'To select controls that predict treatment assignment, capturing chance imbalances',
      'To test the quality of randomization',
      'To evaluate statistical power'
    ],
    correctAnswer: 'To select controls that predict treatment assignment, capturing chance imbalances',
    explanation: 'The second step in PDS Lasso uses Lasso to select controls that predict treatment assignment. While treatment should be orthogonal to all covariates in a perfectly randomized experiment, this step provides a "second chance" to capture variables with strong treatment imbalances due to chance or selective attrition, enhancing robustness.'
  },
  
  {
    id: 9,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is a Conditional Average Treatment Effect (CATE)?',
    options: [
      'The average effect of treatment across all conditions',
      'The effect of treatment on an individual unit',
      'The average treatment effect for a subgroup with specific characteristics',
      'The treatment effect conditional on accepting the treatment'
    ],
    correctAnswer: 'The average treatment effect for a subgroup with specific characteristics',
    explanation: 'A Conditional Average Treatment Effect (CATE) is the average treatment effect for a subgroup with specific characteristics X_i = x. It can be written as τ(x) = E[Y_i(1) - Y_i(0) | X_i = x] and represents how the treatment effect varies across different subpopulations.'
  },
  
  {
    id: 10,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the primary advantage of causal forests over traditional subgroup analysis for heterogeneous treatment effects?',
    options: [
      'They require much smaller sample sizes',
      'They can handle high-dimensional covariates without functional form assumptions',
      'They always produce unbiased individual treatment effect estimates',
      'They eliminate the need for randomization in experiments'
    ],
    correctAnswer: 'They can handle high-dimensional covariates without functional form assumptions',
    explanation: 'Causal forests can handle high-dimensional covariates without requiring functional form assumptions. Unlike traditional subgroup analysis that becomes infeasible with many covariates or requires strong assumptions for continuous covariates, causal forests can discover complex patterns of heterogeneity by partitioning data across many dimensions.'
  },
  
  {
    id: 11,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the bias-variance tradeoff in machine learning and its implications for model selection.',
    correctAnswer: 'The bias-variance tradeoff refers to the competing forces where as model complexity increases, bias decreases but variance increases. Simple models have high bias but low variance, while complex models have low bias but high variance. The goal is to find the optimal complexity that minimizes total error.',
    explanation: 'The bias-variance tradeoff is fundamental to machine learning. As model complexity increases, we better capture the true function (reducing bias), but also fit noise in the training data (increasing variance). The goal is to find the sweet spot that minimizes total error. This is why we use techniques like cross-validation to select models that balance these competing forces.'
  },
  
  {
    id: 12,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What are the key differences between LASSO and ridge regression in terms of the regularization penalty and its effects?',
    correctAnswer: 'LASSO uses an L1 penalty (sum of absolute values) that forces some coefficients to exactly zero, performing variable selection. Ridge uses an L2 penalty (sum of squares) that shrinks all coefficients toward zero but rarely to exactly zero. The LASSO\'s constraint region is diamond-shaped while ridge\'s is circular.',
    explanation: 'LASSO\'s L1 penalty creates a diamond-shaped constraint region whose corners often intersect with axes, forcing coefficients to exactly zero and thus performing variable selection. Ridge\'s L2 penalty creates a circular constraint region that shrinks coefficients proportionally toward zero but rarely to exactly zero. Both methods control complexity but in different ways.'
  },
  
  {
    id: 13,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Describe how a regression tree makes predictions for new observations.',
    correctAnswer: 'A regression tree makes predictions by recursively partitioning the predictor space into regions based on predictor values. For a new observation, the tree routes it through a series of binary splits based on its predictor values until it reaches a terminal node (leaf). The prediction is the mean response value of training observations in that leaf.',
    explanation: 'Regression trees predict by segmenting the predictor space into non-overlapping regions. For new observations, the tree applies a series of yes/no questions based on predictor values until reaching a terminal node. The prediction is simply the mean outcome value of training observations that fell into that same region. This process requires no formal equation and can capture complex relationships without parametric assumptions.'
  },
  
  {
    id: 14,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain how random forests reduce variance compared to single decision trees.',
    correctAnswer: 'Random forests reduce variance by building many decorrelated trees and averaging their predictions. This decorrelation happens in two ways: (1) Each tree is built on a different bootstrap sample of the data, and (2) at each split, only a random subset of predictors is considered. Averaging many high-variance, low-bias estimators results in a lower-variance ensemble.',
    explanation: 'Random forests reduce variance through a two-fold randomization process. First, each tree uses a different bootstrap sample, exposing it to different data. Second, at each split, only a random subset of predictors is considered (typically sqrt(p) for classification), preventing strong predictors from dominating every tree. This creates diverse, decorrelated trees whose errors tend to cancel out when averaged, substantially reducing overall variance.'
  },
  
  {
    id: 15,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the key differences between bagging, random forests, and boosting in ensemble tree methods.',
    correctAnswer: 'Bagging builds many deep trees on bootstrap samples and averages predictions. Random forests add another layer of randomization by considering only a subset of predictors at each split, which decorrelates trees. Boosting builds trees sequentially, with each tree focusing on the errors of previous trees, creating an additive model that gives more weight to difficult-to-predict observations.',
    explanation: 'Bagging reduces variance by averaging trees built on bootstrap samples. Random forests further reduce variance by forcing trees to consider only random subsets of predictors at each split, decorrelating them. Boosting takes a fundamentally different approach, building trees sequentially where each new tree focuses on the errors of previous trees. Bagging/random forests build trees in parallel (independent) while boosting builds them sequentially (dependent).'
  },
  
  {
    id: 16,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Describe the Average Treatment Effect (ATE) in the potential outcomes framework and explain how randomization allows us to estimate it.',
    correctAnswer: 'The ATE is the expected difference between potential outcomes under treatment and control: τ = E[Y_i(1) - Y_i(0)]. Randomization makes treatment assignment independent of potential outcomes, ensuring that treatment and control groups are balanced on observable and unobservable characteristics. This allows us to estimate ATE as the difference in observed outcomes between groups.',
    explanation: 'The ATE represents the average causal effect of treatment across the entire population. While we cannot observe both potential outcomes for any individual, randomization ensures that treatment is independent of potential outcomes. This means the treatment and control groups are comparable in expectation, allowing us to estimate the ATE as the difference in observed mean outcomes between groups.'
  },
  
  {
    id: 17,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain why including baseline covariates in a regression analysis of randomized trials can improve precision without affecting unbiasedness.',
    correctAnswer: 'In randomized trials, treatment assignment is independent of baseline covariates, so the treatment effect estimate remains unbiased regardless of whether covariates are included. However, including covariates that predict the outcome reduces unexplained variance, resulting in more precise estimates (smaller standard errors) and greater statistical power.',
    explanation: 'Due to randomization, treatment assignment is orthogonal to baseline covariates, so controlling for them doesn\'t affect the unbiasedness of the treatment effect estimate. However, covariates that explain variation in the outcome reduce residual variance in the model, leading to smaller standard errors and narrower confidence intervals. This improves precision and power without introducing bias, making it a "free lunch" in randomized trials.'
  },
  
  {
    id: 18,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Describe the three-step procedure of Post-Double Selection (PDS) Lasso and explain its purpose in analyzing randomized trials.',
    correctAnswer: 'PDS Lasso involves: (1) Using Lasso to select controls that predict the outcome, (2) Using Lasso to select controls that predict treatment, and (3) Estimating treatment effects using OLS with the union of selected controls. In randomized trials, it provides a principled, data-driven approach to control variable selection, balancing precision gains against researcher degrees of freedom.',
    explanation: 'PDS Lasso offers a principled approach to covariate selection in randomized trials. The first step selects variables predicting the outcome, improving precision. The second step, though theoretically unnecessary with perfect randomization, captures chance imbalances or selective attrition. The final OLS step uses all selected variables to estimate the treatment effect. This balances the precision benefits of controls against concerns about researcher degrees of freedom in variable selection.'
  },
  
  {
    id: 19,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the difference between individual treatment effects (ITEs) and conditional average treatment effects (CATEs), and why we focus on CATEs in practice.',
    correctAnswer: 'Individual treatment effects (τ_i = Y_i(1) - Y_i(0)) represent the causal effect for a specific individual, while conditional average treatment effects (τ(x) = E[Y_i(1) - Y_i(0) | X_i = x]) represent the average effect for a subgroup with characteristics X_i = x. We focus on CATEs because ITEs are unobservable due to the fundamental problem of causal inference.',
    explanation: 'ITEs represent the true causal effect for each individual, but we cannot observe them directly because we only see one potential outcome per individual. This fundamental limitation leads us to focus on CATEs, which represent average effects for subgroups defined by observable characteristics. While CATEs don\'t provide individual-level predictions, they offer valuable insights into treatment effect heterogeneity across key subpopulations.'
  },
  
  {
    id: 20,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the three main reasons researchers are interested in treatment effect heterogeneity.',
    correctAnswer: 'Researchers study heterogeneity for: (1) Targeting Treatment - directing interventions to those who benefit most, (2) Understanding Mechanisms - gaining insights into why and how treatments work, and (3) External Validity - assessing whether effects will generalize to new populations with different characteristics.',
    explanation: 'Interest in heterogeneity stems from practical and theoretical concerns. Targeting helps maximize impact with limited resources by identifying those who benefit most. Mechanism understanding refines interventions and theory by revealing why treatments work for some but not others. External validity assessments help predict effectiveness in new populations, which is crucial for policy scale-up decisions.'
  },
  
  {
    id: 21,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following research design for estimating treatment effects:',
    content: 'Researchers want to evaluate the effectiveness of a new diabetes management app. They plan to recruit 500 patients with type 2 diabetes and randomly assign 250 to use the app and 250 to receive usual care. After 6 months, they will compare A1c levels between groups. To analyze heterogeneous treatment effects, they plan to examine different subgroups by age, gender, baseline A1c, and 10 other demographic and clinical variables using separate regression analyses for each subgroup.',
    correctAnswer: 'The design has a high risk of false positives from multiple subgroup analyses without adjustment for multiple testing.',
    keyPhrases: ['multiple testing', 'subgroup analyses', 'false positives', 'p-hacking', 'multiplicity'],
    explanation: 'While the randomized design is appropriate for estimating the average treatment effect, the approach to heterogeneity analysis is problematic. Conducting separate analyses for 13+ subgroups without adjusting for multiple testing creates a high risk of false positives. With a standard significance level of 0.05, we would expect to find "significant" heterogeneity in at least one subgroup by chance alone. Better approaches would include: (1) pre-specifying a limited number of hypothesized subgroups in a pre-analysis plan, (2) using interaction terms in a single model instead of separate analyses, (3) adjusting p-values for multiple testing, or (4) using machine learning methods like causal forests that are designed to handle high-dimensional heterogeneity exploration.'
  },
  
  {
    id: 22,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following research design:',
    content: 'Researchers are studying the effect of a new care coordination program on hospital readmissions. They have collected data on 5,000 patients from 10 hospitals. They plan to use LASSO regression to select the most important variables from a set of 200 potential predictors, including demographics, comorbidities, lab values, and the treatment indicator. They will then use the coefficients from this model to report the treatment effect and its significance.',
    correctAnswer: 'This design inappropriately uses LASSO for causal inference, as the penalty could shrink the treatment effect coefficient, leading to biased estimation.',
    keyPhrases: ['LASSO bias', 'treatment effect', 'causal inference', 'penalized coefficient', 'variable selection'],
    explanation: 'This design incorrectly applies LASSO for causal inference. LASSO is designed for prediction, not parameter estimation, and the penalty can shrink the treatment effect coefficient, leading to biased estimates. For causal inference, the treatment indicator should not be penalized. A better approach would be Post-Double Selection LASSO, where: (1) LASSO selects covariates that predict the outcome, (2) LASSO selects covariates that predict treatment, and (3) OLS regression estimates the treatment effect using the union of selected controls but without penalizing the treatment coefficient. This maintains the variable selection benefits while allowing for unbiased treatment effect estimation.'
  },
  
  {
    id: 23,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following research design for examining heterogeneous treatment effects:',
    content: 'A researcher conducted an RCT of a nutrition education intervention with 300 participants (150 treatment, 150 control). To explore heterogeneity, they fit a random forest model predicting outcomes using treatment status and baseline covariates. They then calculated individual treatment effects as the difference between predicted outcomes under treatment versus control for each participant. Finally, they examined which baseline characteristics were most strongly correlated with these individual effect estimates.',
    correctAnswer: 'The design incorrectly estimates individual treatment effects, which cannot be observed directly due to the fundamental problem of causal inference.',
    keyPhrases: ['individual treatment effects', 'fundamental problem', 'counterfactual', 'potential outcomes', 'unobserved outcomes'],
    explanation: 'This design violates the fundamental problem of causal inference by attempting to estimate individual treatment effects directly. We cannot observe both potential outcomes for any individual, so calculating individual treatment effects as described is invalid. Standard random forests are not designed for causal inference and don\'t account for the counterfactual nature of treatment effects. A better approach would be to use methods specifically designed for heterogeneous treatment effects, such as causal forests, which are adapted to estimate conditional average treatment effects (CATEs) for subgroups rather than individuals. These methods are built on the potential outcomes framework and account for the fundamental identification challenges.'
  },
  
  {
    id: 24,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following research design:',
    content: 'Researchers are evaluating a hospital quality improvement program implemented in 50 hospitals, with another 50 hospitals serving as controls. To increase precision, they plan to apply the following procedure: (1) grow a large regression tree to predict patient outcomes, (2) prune the tree to prevent overfitting, and (3) use the terminal nodes (leaves) of this tree to define subgroups, and then estimate separate treatment effects within each subgroup. The average of these subgroup effects, weighted by subgroup size, will be reported as the overall treatment effect.',
    correctAnswer: 'The design inappropriately uses outcome data to define subgroups, creating a risk of data-driven subgroup effects that capitalize on random variation.',
    keyPhrases: ['data-driven subgroups', 'post-hoc analysis', 'overfitting', 'multiple testing', 'cherry-picking'],
    explanation: 'This design has a critical flaw: it uses the outcome data to define the subgroups through the regression tree. This creates a risk of finding spurious heterogeneity that capitalizes on random variation in the data rather than true effect differences. Additionally, examining treatment effects across many tree-defined subgroups without appropriate statistical adjustments introduces multiple testing problems. A better approach would be to either: (1) use baseline covariates only (not outcomes) to define subgroups before examining treatment effects, (2) employ methods specifically designed for causal heterogeneity like causal forests, or (3) split the sample, using one portion to define subgroups and the other to estimate effects within those subgroups.'
  },
  
  {
    id: 25,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Identify and correct methodological flaws in the following study:',
    content: 'Researchers conducted a randomized trial of a telehealth intervention for patients with heart failure. After randomizing 400 patients equally to telehealth or usual care, they analyzed results using a LASSO regression model that included the treatment indicator and 150 baseline covariates. They reported that the LASSO selected 15 variables, including the treatment indicator with a coefficient of 0.15, indicating a significant positive effect on the primary outcome. The researchers concluded that the telehealth intervention significantly improved outcomes with a precisely estimated effect size.',
    correctAnswer: 'The study incorrectly used LASSO for treatment effect estimation, which can bias the treatment coefficient due to regularization.',
    keyPhrases: ['LASSO bias', 'regularization', 'treatment effect', 'penalized coefficient', 'shrinkage'],
    explanation: 'The fundamental flaw is using LASSO directly for treatment effect estimation. LASSO applies a penalty that shrinks all coefficients, including the treatment indicator, which can introduce bias in the treatment effect estimate. Even if the treatment coefficient remains in the model, its magnitude is likely biased downward. For causal inference in high-dimensional settings, Post-Double Selection LASSO would be more appropriate: (1) use LASSO to select variables predicting the outcome, (2) use LASSO to select variables predicting treatment (though less necessary in an RCT), and (3) run an OLS regression with the treatment indicator and selected covariates without penalization. This maintains the variable selection benefits while allowing for unbiased treatment effect estimation.'
  },
  
  {
    id: 26,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Identify methodological flaws in the following study:',
    content: 'A study evaluated the effect of a nutrition program on childhood obesity. They randomized 500 children to intervention or control groups. To maximize precision, they: (1) collected 200 baseline variables, (2) used random forest to identify which variables were most predictive of the outcome, (3) selected the top 10 predictors, and (4) included these in their final regression model estimating the treatment effect. They reported that this data-driven approach yielded a significant treatment effect with a 20% smaller standard error than a model without covariates.',
    correctAnswer: 'Using the same data to select covariates and estimate treatment effects can lead to overfitting and invalid inference.',
    keyPhrases: ['same data', 'overfitting', 'data-driven selection', 'invalid inference', 'inflated precision'],
    explanation: 'The critical flaw is using the same data both to select covariates and to estimate the treatment effect. This creates an overfitting problem where the selected variables may be those that explain random noise in this particular dataset, leading to artificially small standard errors and potentially invalid inference. To correct this issue, the researchers could either: (1) use sample splitting, where one portion of data is used for variable selection and another for treatment effect estimation; (2) use cross-validation techniques that account for the model selection process; or (3) employ methods like Post-Double Selection LASSO that are theoretically justified for high-dimensional inference. While including predictive covariates can improve precision, the selection process must be handled carefully to maintain valid inference.'
  },
  
  {
    id: 27,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Identify methodological flaws in the following study:',
    content: 'Researchers studied heterogeneous effects of a smoking cessation program. After finding a significant average treatment effect, they: (1) divided participants into subgroups based on 10 baseline characteristics, (2) ran separate regressions for each subgroup, (3) identified that the treatment was most effective for women over 50 with a college degree (p = 0.01), and (4) concluded that the program should be targeted specifically to this demographic. This conclusion was not part of their pre-registered hypotheses.',
    correctAnswer: 'The study suffers from multiple hypothesis testing without proper adjustment, leading to an increased risk of false positives in the subgroup analysis.',
    keyPhrases: ['multiple testing', 'subgroup analysis', 'false positives', 'post-hoc', 'p-hacking'],
    explanation: 'This study exhibits classic multiple hypothesis testing problems. By examining treatment effects across numerous subgroups without adjusting for multiple comparisons, the researchers increased their chances of finding "significant" results by chance alone. With 10 baseline characteristics, the number of possible subgroups grows exponentially, greatly inflating the risk of false positives. Additionally, the post-hoc nature of their conclusion (not pre-registered) raises concerns about data mining. To improve this analysis, they should either: (1) pre-specify a limited number of subgroups for testing based on theory, (2) adjust p-values for multiple testing (e.g., Bonferroni correction), (3) use interaction terms in a single model rather than separate subgroup analyses, or (4) employ methods specifically designed for heterogeneity analysis like causal forests.'
  },
  
  {
    id: 28,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Identify methodological flaws in the following study:',
    content: 'A study examined the effect of a new diabetes management program. Patients were randomized to intervention or usual care groups. The researchers used a gradient boosting machine (GBM) model with 300 trees to predict patient outcomes based on treatment status and 50 baseline characteristics. They reported that the GBM showed the treatment had a positive effect, with an average predicted difference of 0.5 units between treated and control conditions across all patients. They also used the GBM model\'s variable importance measures to identify which patient characteristics were most important for treatment success.',
    correctAnswer: 'The study uses a black-box prediction model for causal inference without proper methodology for treatment effect estimation.',
    keyPhrases: ['black-box model', 'causal inference', 'treatment effect', 'machine learning', 'proper identification'],
    explanation: 'This study inappropriately uses a standard machine learning prediction model (GBM) for causal inference without adaptations for treatment effect estimation. The reported "average predicted difference" between treated and control conditions doesn\'t properly account for the fundamental problem of causal inference and may incorporate bias from the model\'s specification. Standard ML methods optimize for prediction accuracy, not causal parameter estimation. Additionally, variable importance measures from standard GBM models don\'t necessarily identify modifiers of treatment effects. Better approaches would include: (1) using methods specifically designed for causal inference such as causal forests or double/debiased machine learning, (2) employing a doubly-robust estimator with machine learning components, or (3) using the machine learning model only for outcome prediction while estimating treatment effects through established causal inference methods.'
  },
  
  {
    id: 29,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Using counterfactual reasoning, analyze the following scenario:',
    content: 'A hospital implemented a new electronic health record (EHR) system designed to reduce medication errors. Researchers compared error rates for 6 months before and 6 months after implementation. They found that error rates decreased by 30% and concluded that the EHR system was effective at reducing medication errors.',
    correctAnswer: 'The missing counterfactual is what would have happened to the error rates in the absence of the EHR implementation during the same time period.',
    keyPhrases: ['time trend', 'counterfactual', 'before-after', 'secular trends', 'alternative explanations'],
    explanation: 'This before-after comparison fails to establish the counterfactual: what would have happened without the EHR implementation? The 30% reduction might be due to the EHR or to other factors that changed over time, such as staff learning, other quality initiatives, changes in patient mix, or seasonal variations. Without a control group that didn\'t receive the EHR but experienced all these other time-varying factors, we can\'t isolate the causal effect of the EHR itself. A stronger design would include a comparison group of similar units/hospitals that didn\'t implement the EHR during the same period, allowing for a difference-in-differences analysis that better approximates the counterfactual condition.'
  },
  
  {
    id: 30,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Using counterfactual reasoning, analyze the following scenario:',
    content: 'Researchers conducted a randomized trial of a weight loss program, finding that participants lost an average of 5kg more than the control group. In a subgroup analysis, they found that participants who attended at least 80% of the program sessions lost 8kg more than controls, while those who attended less than 80% lost only 2kg more than controls. They concluded that higher attendance causes greater weight loss and recommended strategies to increase attendance.',
    correctAnswer: 'The missing counterfactual is what weight loss would have been for high-attending participants had they attended fewer sessions, which cannot be inferred from the subgroup comparison.',
    keyPhrases: ['selection bias', 'counterfactual', 'attendance', 'subgroup analysis', 'causal interpretation'],
    explanation: 'This analysis confuses association with causation in the subgroup analysis. While the overall 5kg difference between treatment and control can be causally attributed to the program (due to randomization), the comparison between high and low attenders is observational and subject to selection bias. Participants who attended more sessions likely differ systematically from those who attended fewer sessions on factors related to motivation, health consciousness, or life circumstances that also affect weight loss outcomes. The counterfactual we cannot observe is: what would the high-attenders have lost if they had attended fewer sessions? Without randomization of attendance levels, we cannot determine whether higher attendance causes greater weight loss or whether attendance and weight loss are both caused by underlying factors like motivation. A better approach might use instrumental variables, principal stratification, or mediation analysis to explore the causal role of attendance.'
  },
  
  {
    id: 31,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Using counterfactual reasoning, analyze the following scenario:',
    content: 'A state implemented a new value-based payment system for hospitals. Researchers found that hospital readmission rates decreased more in teaching hospitals (-5 percentage points) than in non-teaching hospitals (-2 percentage points) after implementation. They concluded that the payment system was more effective in teaching hospitals and recommended tailored payment approaches for different hospital types.',
    correctAnswer: 'The missing counterfactual is what would have happened to teaching hospitals if they had been non-teaching hospitals, and vice versa, which cannot be determined due to fundamental differences between hospital types.',
    keyPhrases: ['hospital differences', 'counterfactual', 'teaching status', 'differential response', 'causal interpretation'],
    explanation: 'This analysis identifies an association between teaching status and response to the payment system, but causal interpretation is challenged by fundamental differences between hospital types. Teaching and non-teaching hospitals differ in patient populations, resources, staffing, and many other factors that could explain differential responses to payment changes. The missing counterfactual is what would have happened if teaching hospitals had somehow been non-teaching hospitals (and vice versa) when exposed to the same payment system. Since hospital teaching status cannot be randomly assigned, we cannot directly estimate this. To strengthen causal inference about differential effects, researchers could: (1) adjust for differences in hospital and patient characteristics, (2) use matching or weighting to make the groups more comparable, or (3) examine pre-intervention trends to validate the parallel trends assumption needed for difference-in-differences interpretation.'
  },
  
  {
    id: 32,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Using counterfactual reasoning, analyze the following scenario:',
    content: 'A randomized trial of a new medication found it reduced blood pressure by 10 mmHg on average compared to placebo. Using causal forest methods, researchers identified that the treatment effect was strongest for patients with baseline systolic BP > 160 mmHg, where the reduction was 15 mmHg, compared to just 5 mmHg for patients with baseline BP < 160 mmHg. They concluded that the medication should be targeted to patients with higher baseline blood pressure.',
    correctAnswer: 'While the average treatment effect is causally identified through randomization, the heterogeneity analysis still relies on the assumption that the causal forest correctly specifies the relationship between baseline characteristics and treatment effects.',
    keyPhrases: ['heterogeneity', 'causal forest', 'baseline risk', 'treatment effect', 'model dependence'],
    explanation: 'The counterfactual reasoning here is more nuanced than in typical subgroup analyses. The overall average treatment effect is causally identified through randomization. The causal forest approach improves on simple subgroup analysis by accounting for multiple covariates simultaneously and using machine learning to avoid overfitting. However, the identified heterogeneity pattern still depends on modeling assumptions about the relationship between baseline characteristics and treatment effects. The treatment recommendation for higher-BP patients seems reasonable based on both clinical logic (higher baseline, more room for improvement) and the data-driven findings. Nevertheless, it\'s important to recognize that even sophisticated methods like causal forests can\'t completely eliminate model dependence in heterogeneity analysis. Ideally, the findings would be validated in an independent trial specifically designed to test this heterogeneity hypothesis.'
  },
  
  {
    id: 33,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the following statistical output from a regression tree analysis:',
    content: 'Regression Tree for Patient Satisfaction Scores (0-100 scale)\n\nTree structure:\nNode 1: Root node, Mean = 72.5, N = 500\n  Split: Nurse-to-patient ratio < 0.25\n  Node 2: Mean = 65.2, N = 300\n    Split: Wait time >= 45 minutes\n    Node 4: Mean = 58.7, N = 180\n    Node 5: Mean = 75.0, N = 120\n  Node 3: Mean = 83.5, N = 200\n    Split: Hospital size >= 300 beds\n    Node 6: Mean = 78.2, N = 90\n    Node 7: Mean = 87.8, N = 110\n\nVariable importance:\n1. Nurse-to-patient ratio: 100.0\n2. Wait time: 65.7\n3. Hospital size: 32.4\n4. Doctor experience: 12.1\n5. Patient age: 8.5',
    correctAnswer: 'The regression tree identifies nurse-to-patient ratio as the most important predictor of patient satisfaction, followed by wait time and hospital size. The highest satisfaction (87.8) occurs in hospitals with high nurse ratios and fewer than 300 beds, while the lowest (58.7) occurs with low nurse ratios and long wait times.',
    keyPhrases: ['regression tree', 'variable importance', 'splits', 'satisfaction scores', 'predictors'],
    explanation: 'This regression tree partitions patients based on key predictors to create homogeneous groups with respect to satisfaction scores. The first split on nurse-to-patient ratio creates the largest reduction in variance, indicating it\'s the most important predictor (confirmed by the variable importance score of 100). Patients at hospitals with higher nurse ratios (≥0.25) have substantially higher satisfaction (83.5 vs 65.2). Within the low nurse ratio group, wait time further distinguishes satisfaction levels, with long waits (≥45 min) associated with the lowest satisfaction (58.7). In the high nurse ratio group, smaller hospitals (<300 beds) have the highest satisfaction scores (87.8). The tree captures non-linear relationships and interactions between predictors without requiring parametric assumptions, illustrating the key advantage of tree-based methods.'
  },
  
  {
    id: 34,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the following statistical output from a regression analysis of a randomized trial:',
    content: 'Outcome: Healthcare Costs (in $1000s)\n\nModel 1 (No Controls):\n             Estimate  Std. Error  t value  Pr(>|t|)    \n(Intercept)   15.673     0.612     25.61    <0.001 ***\nTreatment     -2.345     1.023     -2.29     0.023 *  \n\nModel 2 (With Controls):\n             Estimate  Std. Error  t value  Pr(>|t|)    \n(Intercept)    6.781     1.245      5.45    <0.001 ***\nTreatment     -2.412     0.721     -3.35    <0.001 ***\nBaseline Cost   0.621     0.072      8.63    <0.001 ***\nAge             0.129     0.031      4.16    <0.001 ***\nFemale         -1.564     0.685     -2.28     0.023 *  \nComorbidity     2.731     0.459      5.95    <0.001 ***',
    correctAnswer: 'Adding baseline controls improved the precision of the treatment effect estimate (SE reduced from 1.023 to 0.721) while the estimate remained stable (-2.345 vs -2.412), indicating the treatment reduces healthcare costs by approximately $2,400 per patient.',
    keyPhrases: ['precision', 'treatment effect', 'baseline controls', 'standard error', 'costs'],
    explanation: 'Both models show that the intervention reduced healthcare costs by approximately $2,400 per patient. However, Model 2 with baseline controls provides a more precise estimate, as evidenced by the reduced standard error (0.721 vs. 1.023) and the smaller p-value. This demonstrates a key advantage of controlling for baseline covariates in randomized trials - improved precision without affecting unbiasedness. The stability of the treatment effect estimate across models (-2.345 vs. -2.412) is consistent with successful randomization. Additionally, Model 2 reveals that baseline costs, age, gender, and comorbidities are all significant predictors of healthcare costs, with baseline costs and comorbidities having particularly strong effects. This analysis illustrates the benefits of the ANCOVA approach in randomized trials.'
  },
  
  {
    id: 35,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the following statistical output from a PDS Lasso analysis:',
    content: 'Post-Double Selection Lasso Results\n\nStep 1 (Outcome prediction):\nSelected variables: Baseline outcome, Age, Comorbidity index, Prior hospitalizations\n\nStep 2 (Treatment prediction):\nSelected variables: Age, Education\n\nFinal OLS regression:\nOutcome: 30-day readmission\n\n             Estimate  Std. Error  t value  Pr(>|t|)    \n(Intercept)    0.173     0.024      7.21    <0.001 ***\nTreatment      -0.078     0.019     -4.11    <0.001 ***\nBaseline        0.312     0.034      9.18    <0.001 ***\nAge             0.004     0.001      4.00    <0.001 ***\nComorbidity     0.029     0.007      4.14    <0.001 ***\nPrior hosp      0.026     0.008      3.25     0.001 ** \nEducation      -0.015     0.006     -2.50     0.013 *  \n\nComparison with unadjusted estimate:\nUnadjusted:    -0.072     0.024     -3.00     0.003 ** ',
    correctAnswer: 'PDS Lasso selected 4 variables in Step 1 (outcome prediction) and 2 in Step 2 (treatment prediction), with Age appearing in both steps. The final model shows the treatment reduced readmission by 7.8 percentage points, with improved precision compared to the unadjusted estimate (SE: 0.019 vs 0.024).',
    keyPhrases: ['PDS Lasso', 'variable selection', 'precision', 'treatment effect', 'standard error'],
    explanation: 'This PDS Lasso analysis demonstrates the method\'s approach to principled variable selection. In Step 1, four variables were selected as predictors of the outcome (baseline readmission, age, comorbidity, prior hospitalizations). In Step 2, two variables were selected as predictors of treatment (age, education), suggesting some chance imbalance despite randomization. The final OLS model includes the union of these variables. The adjusted treatment effect estimate (-0.078) indicates the intervention reduced 30-day readmissions by 7.8 percentage points. Compared to the unadjusted estimate (-0.072), the magnitude is similar, but precision has improved as shown by the smaller standard error (0.019 vs 0.024) and larger t-value (-4.11 vs -3.00). This highlights how PDS Lasso can improve precision while maintaining a disciplined approach to covariate selection.'
  },

  {
    id: 36,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the following statistical output from a heterogeneous treatment effect analysis:',
    content: 'Causal Forest Variable Importance (normalized to 100):\n1. Baseline score: 42.3\n2. Household income: 27.8\n3. Education level: 18.5\n4. Distance to facility: 9.2\n5. Age: 2.2\n\nConditional Average Treatment Effects (CATEs) by Subgroups:\n\nBaseline Score Quartiles:\n  Q1 (lowest): 0.42 (95% CI: 0.28, 0.56)\n  Q2: 0.34 (95% CI: 0.22, 0.46)\n  Q3: 0.21 (95% CI: 0.09, 0.33)\n  Q4 (highest): 0.12 (95% CI: 0.01, 0.23)\n  Difference (Q1-Q4): 0.30 (95% CI: 0.14, 0.46)\n\nIncome Level:\n  Low income: 0.38 (95% CI: 0.26, 0.50)\n  High income: 0.18 (95% CI: 0.09, 0.27)\n  Difference: 0.20 (95% CI: 0.06, 0.34)\n\nAverage Treatment Effect (ATE): 0.27 (95% CI: 0.19, 0.35)',
    correctAnswer: 'The causal forest identifies baseline score as the most important predictor of treatment effect heterogeneity (42.3%), followed by household income (27.8%). Treatment effects are strongest for those with low baseline scores (0.42) and low income (0.38), with treatment effects decreasing as baseline scores or income increase. The overall ATE is 0.27.',
    keyPhrases: ['heterogeneity', 'causal forest', 'variable importance', 'CATEs', 'subgroups'],
    explanation: 'This analysis reveals substantial treatment effect heterogeneity. Baseline score is the strongest predictor of heterogeneity (42.3% importance), with treatment effects three times larger for those with the lowest baseline scores (0.42) compared to those with the highest (0.12). Household income is the second most important moderator (27.8%), with low-income individuals experiencing treatment effects more than twice as large as high-income individuals (0.38 vs 0.18). Both these differences are statistically significant based on their confidence intervals. The overall average treatment effect (0.27) masks this important heterogeneity. These findings suggest the intervention is most effective for disadvantaged individuals with poor baseline outcomes, which has important implications for targeting and equity considerations.'
  },
  
  {
    id: 37,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Select and justify the most appropriate analytical method for the following research question:',
    content: 'Researchers want to understand which patient characteristics predict responsiveness to a new diabetes medication in a completed randomized trial. They have data on 50 baseline variables including demographics, lab values, comorbidities, and medication use. The sample size is 500 patients (250 in each arm).',
    correctAnswer: 'Causal forest methods would be appropriate for identifying patient characteristics that predict heterogeneous treatment effects while accounting for multiple testing concerns.',
    keyPhrases: ['heterogeneous treatment effects', 'causal forest', 'high-dimensional', 'treatment response', 'patient characteristics'],
    explanation: 'This is a classic case for causal forest methods or similar machine learning approaches designed for heterogeneous treatment effect estimation. With 50 baseline variables and 500 patients, traditional subgroup analyses would be problematic due to multiple testing concerns (high risk of false positives) and limited power within small subgroups. Causal forests are specifically designed to identify variables that predict treatment effect heterogeneity in high-dimensional settings. They can handle continuous and categorical predictors without requiring pre-specification of functional forms, and they implicitly account for multiple testing through their regularization approach. The method would identify which patient characteristics most strongly predict treatment response and estimate conditional average treatment effects across different patient profiles, providing valuable insights for precision medicine without the pitfalls of traditional subgroup analyses.'
  },
  
  {
    id: 38,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Select and justify the most appropriate analytical method for the following research question:',
    content: 'A health system implemented a care coordination program for high-risk patients. To evaluate its effectiveness, they collected data on healthcare utilization for 2,000 patients (1,000 enrolled in the program, 1,000 not enrolled) for one year before and one year after program implementation. Patients were not randomly assigned to the program but were identified based on risk scores.',
    correctAnswer: 'Difference-in-differences with matching or propensity score weighting would be appropriate to account for selection bias and baseline differences.',
    keyPhrases: ['difference-in-differences', 'selection bias', 'matching', 'propensity scores', 'before-after data'],
    explanation: 'This is an observational study with selection bias (patients assigned to treatment based on risk scores) and before-after data for both treated and control groups. A difference-in-differences (DiD) approach combined with matching or propensity score weighting would be most appropriate. The DiD component accounts for time-invariant unobserved confounders and common time trends by comparing the change in outcomes for the treatment group to the change for the control group. The matching or propensity score component addresses the selection bias by creating comparable treatment and control groups based on observable characteristics. Specifically, patients could be matched on baseline risk scores and other characteristics, or weights could be constructed to balance these factors across groups. This combined approach would provide a more credible estimate of the program\'s causal effect than simple before-after or treatment-control comparisons alone.'
  },
  
  {
    id: 39,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Select and justify the most appropriate analytical method for the following research question:',
    content: 'Researchers are analyzing data from a randomized trial testing a behavioral intervention to improve medication adherence. They want to estimate the average treatment effect with maximum precision. They have baseline data on medication adherence, demographics, and health status for all 400 participants (200 in each arm).',
    correctAnswer: 'ANCOVA with baseline adherence and key predictors of the outcome would be most appropriate for maximizing precision while maintaining unbiasedness.',
    keyPhrases: ['ANCOVA', 'randomized trial', 'precision', 'baseline covariates', 'treatment effect'],
    explanation: 'For a randomized trial with baseline covariates and the goal of maximizing precision, ANCOVA (Analysis of Covariance) is the most appropriate method. In this approach, the researchers would regress the outcome (medication adherence) on the treatment indicator while controlling for baseline adherence and other pre-treatment covariates that predict the outcome. Controlling for the baseline value of the outcome typically provides the largest precision gain. Additional covariates should be included if they explain substantial variation in the outcome. Due to randomization, this approach maintains unbiasedness of the treatment effect estimate while reducing residual variance, resulting in smaller standard errors and increased power. While methods like Post-Double Selection LASSO could also be considered for variable selection, the moderate number of covariates in this case makes standard ANCOVA with theory-guided covariate selection a straightforward and effective approach.'
  },
  
  {
    id: 40,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Select and justify the most appropriate analytical method for the following research question:',
    content: 'Hospital administrators want to predict which patients are at highest risk of 30-day readmission to better target discharge planning services. They have data on 10,000 past patients with 200 variables including demographics, diagnoses, procedures, lab values, vital signs, medications, and healthcare utilization history.',
    correctAnswer: 'Random forests or gradient boosting would be appropriate for this prediction task given the large number of predictors and potential non-linear relationships.',
    keyPhrases: ['prediction', 'random forests', 'gradient boosting', 'non-linear', 'high-dimensional'],
    explanation: 'This is a prediction problem with a large number of variables (200) and substantial sample size (10,000), making it ideal for flexible machine learning methods. Random forests or gradient boosting models would be particularly appropriate because: (1) they can capture non-linear relationships and interactions that likely exist in clinical data; (2) they handle mixed data types (continuous, categorical) without preprocessing; (3) they perform well with high-dimensional data and automatically manage feature selection; (4) they\'re relatively robust to outliers and missing data; and (5) they provide measures of variable importance to identify key predictors. Unlike regression, these methods don\'t require specifying functional forms or interactions in advance. Since the goal is prediction rather than causal inference, we can leverage the full predictive power of these methods without concerns about parameter interpretation. Cross-validation should be used to tune model parameters and assess predictive performance.'
  },
  
  {
    id: 41,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In Post-Double Selection (PDS) Lasso, what is the purpose of the "amelioration set"?',
    options: [
      'To identify highly correlated predictors',
      'To ensure important variables are included regardless of selection',
      'To remove irrelevant predictors from the model',
      'To validate the results of the initial selection'
    ],
    correctAnswer: 'To ensure important variables are included regardless of selection',
    explanation: 'The amelioration set (I₃) in PDS Lasso contains variables that are always included in the final regression regardless of whether they are selected by the Lasso steps. This protects against underselection of important variables. In randomized trials, recommended inclusions for the amelioration set are the lagged dependent variable (baseline outcome) and randomization strata fixed effects, as these variables are particularly important for precision gain and proper accounting for the experimental design.'
  },
  
  {
    id: 42,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the key limitation of using "difference in means" as an estimator for the Average Treatment Effect in an RCT?',
    options: [
      'It is biased for the ATE',
      'It does not account for the potential outcomes framework',
      'It may have high variance, especially with small samples',
      'It cannot be implemented with modern statistical software'
    ],
    correctAnswer: 'It may have high variance, especially with small samples',
    explanation: 'The difference in means estimator is unbiased for the ATE in an RCT due to randomization making treatment assignment independent of potential outcomes. However, its key limitation is that it may have high variance, especially with small samples. It does not leverage baseline information or account for the design of the experiment (e.g., stratification), which could improve precision. This leads to wider confidence intervals and less statistical power than methods that incorporate baseline covariates, such as ANCOVA.'
  },
  
  {
    id: 43,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is a key difference between traditional subgroup analysis and causal forest methods for examining heterogeneous treatment effects?',
    options: [
      'Traditional methods provide exact p-values while causal forests only provide estimates',
      'Traditional methods require randomized data while causal forests work with any data',
      'Causal forests can handle high-dimensional covariates without requiring pre-specified functional forms',
      'Traditional methods examine continuous treatment effects while causal forests only work with binary treatments'
    ],
    correctAnswer: 'Causal forests can handle high-dimensional covariates without requiring pre-specified functional forms',
    explanation: 'A key advantage of causal forests over traditional subgroup analysis is their ability to handle high-dimensional covariates without requiring pre-specified functional forms. Traditional methods quickly become infeasible with many covariates due to sample size limitations and multiple testing concerns. They also require assuming functional forms for continuous variables. Causal forests use machine learning to discover patterns of heterogeneity across many dimensions simultaneously, automatically finding interactions that might be missed in traditional approaches, while incorporating regularization to prevent overfitting.'
  },
  
  {
    id: 44,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What did Cilliers, Elashmawy, and McKenzie (2024) find about PDS Lasso\'s effectiveness for increasing precision in randomized trials?',
    options: [
      'It typically selected many variables and substantially reduced standard errors',
      'It selected few variables and provided minimal precision gains over ANCOVA approaches',
      'It performed worse than standard ANCOVA in most cases',
      'It eliminated the need for randomization strata in the model'
    ],
    correctAnswer: 'It selected few variables and provided minimal precision gains over ANCOVA approaches',
    explanation: 'Cilliers, Elashmawy, and McKenzie (2024) found that despite having many potential controls (median 182), PDS Lasso selected very few (median 2). The method produced very minimal changes in treatment estimates (median 0.01 SD) and only slight reductions in standard errors (median ratio 0.992) compared to standard ANCOVA approaches. The implied minimum detectable effect (MDE) reduction was only 0.9% at the median. This suggests that while PDS Lasso provides a principled approach to variable selection, it offers limited precision gains compared to standard ANCOVA approaches in most field experiments.'
  },
  
  {
    id: 45,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following is a key reason for exploring heterogeneous treatment effects in health services research?',
    options: [
      'To increase sample size requirements for future studies',
      'To avoid having to specify pre-analysis plans',
      'To target interventions to those who benefit most',
      'To ensure statistically significant main effects'
    ],
    correctAnswer: 'To target interventions to those who benefit most',
    explanation: 'A key reason for exploring heterogeneous treatment effects is to enable targeting interventions to those who benefit most. This allows for more efficient allocation of limited resources by directing interventions to subpopulations where they will have the greatest impact. Other important reasons include understanding mechanisms (why treatments work or don\'t work) and assessing external validity (whether effects will generalize to new populations). Heterogeneity analysis typically requires larger samples than main effect estimation, rather than reducing sample size requirements.'
  },
  
  {
    id: 46,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the key differences between prediction and causal inference tasks in the context of machine learning applications.',
    correctAnswer: 'Prediction focuses on accurately estimating ŷ (outcome) given x (features) within the same distribution, without concern for causal relationships or structural parameters. Causal inference focuses on estimating β̂ (parameters) that represent structural relationships, enabling counterfactual reasoning across different distributions. ML excels at prediction but requires special adaptations for causal inference to deal with challenges like confounding and selection bias.',
    explanation: 'Prediction aims to find a function f(x) that minimizes loss for predicting outcomes within the same distribution. Success is evaluated through out-of-sample performance, regardless of whether the model structure is "true." Causal inference, however, focuses on estimating structural parameters that represent causal relationships, allowing for counterfactual reasoning and policy analysis across different distributions. Standard ML methods optimize for prediction accuracy, not parameter estimation, making them inappropriate for direct causal inference without adaptation. While achieving minimal prediction loss doesn\'t guarantee consistent parameter estimates, ML tools can be adapted for causal inference through methods like double/debiased machine learning or causal forests.'
  },
  
  {
    id: 47,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain why the LASSO penalty tends to perform variable selection while the ridge penalty does not.',
    correctAnswer: 'The LASSO\'s L1 penalty (sum of absolute values) creates a diamond-shaped constraint region whose corners often intersect with axes, forcing some coefficients to exactly zero. The ridge\'s L2 penalty (sum of squares) creates a circular constraint region with no corners, proportionally shrinking coefficients toward but rarely to exactly zero.',
    explanation: 'The geometric interpretation explains why LASSO performs variable selection while ridge does not. The LASSO\'s L1 penalty creates a diamond-shaped constraint region in parameter space. When the contours of the RSS function intersect this region, they often do so at corners, which lie on coordinate axes, meaning some coefficients equal exactly zero. In contrast, ridge\'s L2 penalty creates a circular constraint region with no corners. The smooth circular shape means solutions rarely occur exactly on axes, so coefficients are shrunk toward zero but rarely equal exactly zero. This fundamental difference in geometry explains LASSO\'s variable selection property.'
  },
  
  {
    id: 48,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain why randomization allows us to estimate causal effects in experiments.',
    correctAnswer: 'Randomization makes treatment assignment independent of potential outcomes, ensuring that treatment and control groups are balanced on observable and unobservable characteristics in expectation. This allows us to attribute differences in outcomes to the treatment effect rather than to pre-existing differences between groups.',
    explanation: 'Randomization solves the fundamental problem of causal inference by creating groups that are comparable in all respects except for treatment exposure. Formally, randomization ensures that W_i ⊥⊥ (Y_i(0), Y_i(1)), meaning treatment assignment is independent of potential outcomes. This means treatment and control groups are balanced on all characteristics (observed and unobserved) in expectation. Consequently, E[Y_i(1)|W_i=1] = E[Y_i(1)] and E[Y_i(0)|W_i=0] = E[Y_i(0)], allowing us to estimate the average treatment effect as the difference in observed outcomes between groups.'
  },
  
  {
    id: 49,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain how gradient boosting differs from random forests in building an ensemble of trees.',
    correctAnswer: 'Random forests build trees in parallel using bootstrapped samples and average their predictions. Gradient boosting builds trees sequentially, with each tree focused on correcting the errors of previous trees. Random forests reduce variance through decorrelation and averaging, while boosting reduces both bias and variance through sequential error correction.',
    explanation: 'The fundamental difference is in how the ensembles are constructed. Random forests build many independent trees in parallel, each on a bootstrap sample of the data, and average their predictions. Each tree tries to predict the outcome directly. In contrast, gradient boosting builds trees sequentially in an additive model. Each new tree is specifically trained to correct the errors made by the ensemble of previous trees, essentially fitting to the residuals. Random forests primarily reduce variance through averaging decorrelated trees, while boosting can reduce both bias and variance by sequentially correcting mistakes. This sequential nature makes boosting potentially more powerful but also more prone to overfitting without proper regularization.'
  },
  
  {
    id: 50,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Describe three key considerations when implementing Post-Double Selection Lasso in randomized trials.',
    correctAnswer: 'Key considerations include: (1) Be realistic about precision gains, which are typically small compared to ANCOVA; (2) Include important variables like baseline outcome and randomization strata in the amelioration set; and (3) Be judicious with input controls, avoiding a "kitchen sink" approach with hundreds of variables that can lead to underselection.',
    explanation: 'When implementing PDS Lasso in randomized trials, researchers should: (1) Recognize that precision gains are typically very small compared to standard ANCOVA, with median standard error reductions of less than 1%; (2) Always include key variables in the amelioration set, particularly the baseline outcome and randomization strata, as these variables are critical for precision; (3) Avoid the "kitchen sink" approach with hundreds of variables, as the Lasso penalty increases with the number of potential controls, potentially leading to no variables being selected; (4) Handle missing values carefully to avoid reduced sample sizes; and (5) Consider using PDS Lasso as a robustness check rather than the primary analysis method, given its limited benefits over ANCOVA in most field experiments.'
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
