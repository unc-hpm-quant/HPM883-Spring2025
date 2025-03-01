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
    question: 'What is the fundamental problem of causal inference as described in the potential outcomes framework?',
    options: [
      'The inability to establish causality without randomization',
      'The difficulty of collecting accurate data in experimental settings',
      'The inability to observe both potential outcomes for the same individual simultaneously',
      'The challenge of properly randomizing subjects into treatment and control groups'
    ],
    correctAnswer: 'The inability to observe both potential outcomes for the same individual simultaneously',
    explanation: 'The Fundamental Problem of Causal Inference is that we never observe what would have happened to an individual if the alternative action had been applied. Because a unit can only receive one treatment at a time, we cannot simultaneously observe both treatment and control outcomes for the same unit.'
  },
  {
    id: 2,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following is NOT one of the four key exclusion restrictions necessary for valid experimental results?',
    options: [
      'Observability',
      'Complete Compliance',
      'Statistical Independence',
      'Cost Effectiveness'
    ],
    correctAnswer: 'Cost Effectiveness',
    explanation: 'The four key exclusion restrictions are: (1) Observability (outcomes must be observed for all individuals), (2) Complete Compliance (those assigned to treatment must receive it, and those assigned to control must not), (3) Statistical Independence (treatment assignment is independent of potential outcomes), and (4) Stable Unit Treatment Value Assumption (SUTVA) (the treatment of one individual must not affect another\'s outcomes). Cost effectiveness is not one of these restrictions.'
  },
  {
    id: 3,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Using counterfactual reasoning, analyze the following scenario:',
    content: 'A study finds that communities with higher uptake of preventive care have fewer emergency room visits. Based on this, policymakers implement a nationwide free preventive care program but observe no significant reduction in emergency room visits.',
    correctAnswer: 'The missing counterfactual is what would have happened to communities with high preventive care uptake if they had low uptake, which cannot be inferred due to selection and confounding factors.',
    keyPhrases: ['selection bias', 'counterfactual', 'confounding', 'causal inference'],
    explanation: 'Communities with higher preventive care uptake likely differ in many ways from communities with lower uptake—they may have better healthcare infrastructure, higher income levels, better health literacy, etc. These factors independently affect emergency room visit rates. The observed association between preventive care and fewer ER visits may be due to these confounding factors rather than a causal effect of preventive care. Implementing preventive care without addressing these underlying factors would not replicate the observed association.'
  },
  {
    id: 4,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What are the three conditions for a valid assignment mechanism in randomized experiments, as described in the lecture materials?',
    correctAnswer: "Non-zero probability, Individualism, and Unconfoundedness",
    explanation: 'The three conditions for a valid assignment mechanism are: (1) Non-zero probability: Each individual has a positive probability of being assigned to treatment or control; (2) Individualism: Assignments are independent across individuals and do not depend on others\' potential outcomes; (3) Unconfoundedness: Treatment assignment is orthogonal to potential outcomes.'
  },
  {
    id: 5,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'According to the optimal experimental design lecture, what is the optimal allocation ratio between treatment and control groups when costs and variances differ?',
    options: [
      'Always an equal 50:50 split',
      'Proportional to the square root of the ratio of variances',
      'Proportional to the square root of the ratio of costs',
      'Proportional to the square root of the ratio of (variance × cost) between groups'
    ],
    correctAnswer: 'Proportional to the square root of the ratio of (variance × cost) between groups',
    explanation: 'When both costs and variances differ between treatment and control groups, the optimal allocation ratio is n₁/n₀ = √[(σ₁²·c₀)/(σ₀²·c₁)], where n₁ and n₀ are sample sizes, σ₁² and σ₀² are variances, and c₁ and c₀ are per-unit costs for treatment and control groups, respectively.'
  },
  {
    id: 6,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain what the following R code does in the context of experimental design:',
    content: 'dt[, treatment := rbinom(.N, 1, p)]\ndt[, .N, by = treatment]',
    correctAnswer: 'The code performs Bernoulli randomization and checks the resulting group sizes.',
    keyPhrases: ['Bernoulli trial', 'randomization', 'treatment assignment', 'group sizes'],
    explanation: 'This code implements Bernoulli trial randomization. The first line assigns treatment status to each unit with probability p using random binomial draws. The second line counts how many units were assigned to each treatment group (0 or 1). This is the simplest form of randomization where each unit independently has the same probability of receiving treatment.'
  },
  {
    id: 7,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Identify methodological flaws in the following study:',
    content: 'Researchers implemented a new hospital management program in hospitals that volunteered to participate, while using non-volunteering hospitals as controls. After 12 months, they found that hospitals using the new program had 15% lower readmission rates and concluded that the program was effective at reducing readmissions.',
    correctAnswer: 'The study suffers from selection bias due to self-selection into treatment, threatening internal validity.',
    keyPhrases: ['selection bias', 'self-selection', 'internal validity', 'confounding'],
    explanation: 'The main flaw is selection bias due to self-selection into treatment. Hospitals that volunteer for a new management program likely differ systematically from those that don\'t in ways that could affect readmission rates (e.g., more resources, more motivated leadership, better baseline performance). These differences, rather than the program itself, could explain the observed reduction in readmissions. A better design would use randomization to determine which hospitals implement the program.'
  },
  {
    id: 8,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'When calculating the Minimum Detectable Effect (MDE) for an experiment, which of the following is NOT a key component?',
    options: [
      'Significance level (α)',
      'Statistical power (1-β)',
      'Variance of outcomes',
      'Expected treatment effect size'
    ],
    correctAnswer: 'Expected treatment effect size',
    explanation: 'The Minimum Detectable Effect (MDE) calculation includes the significance level (α), statistical power (1-β), and variance of outcomes. The expected treatment effect size is not part of the MDE calculation. In fact, the MDE represents the smallest effect size that can be detected with the specified significance level and power, not the effect size you expect to observe.'
  },
  {
    id: 9,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The following R code is supposed to implement complete randomization with a 50-50 split, but contains an error. Identify and correct it:',
    content: 'set.seed(123)\nn <- 100\ndt <- data.table(id = 1:n)\ndt[, treatment := runif(.N) > 0.5]',
    correctAnswer: 'The code implements Bernoulli randomization, not complete randomization with exact group sizes.',
    keyPhrases: ['complete randomization', 'Bernoulli randomization', 'fixed sample size', 'exact allocation'],
    explanation: 'The code implements Bernoulli randomization (independent coin flips), not complete randomization with a fixed allocation. This means the final groups might not have exactly 50 units each. To implement complete randomization with exactly 50% in treatment, the code should be:\n\nset.seed(123)\nn <- 100\ndt <- data.table(id = 1:n)\ndt[, random_num := runif(.N)]\nsetorder(dt, random_num)\ndt[, treatment := 0]\ndt[1:(.N/2), treatment := 1]'
  },
  {
    id: 10,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Select and justify the most appropriate randomization method for the following research scenario:',
    content: 'A researcher is planning a clinical trial with 60 patients. Previous research suggests that age and disease severity are strongly associated with treatment response. The researcher has baseline data on all patients including their age, disease severity scores, and other demographic information.',
    correctAnswer: 'Stratified randomization using age and disease severity as stratification variables would be most appropriate.',
    keyPhrases: ['stratified randomization', 'baseline covariates', 'balance', 'prognostic factors'],
    explanation: 'Stratified randomization would be most appropriate here. Since age and disease severity are known to be strongly associated with the outcome, ensuring balance on these variables between treatment groups will increase statistical power. The researcher should create strata based on combinations of age categories and disease severity levels, then randomize separately within each stratum. This guarantees balance on these important prognostic factors while maintaining the benefits of randomization.'
  },
  {
    id: 11,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following research design for evaluating a telehealth intervention:',
    content: 'Researchers will implement a telehealth program at 5 rural clinics. To evaluate effectiveness, they will compare patient satisfaction and emergency department utilization before and after implementation at these clinics.',
    correctAnswer: 'This pre-post design lacks a control group, making it vulnerable to confounding from time trends, seasonal effects, and other concurrent changes.',
    keyPhrases: ['control group', 'pre-post design', 'time trends', 'concurrent changes'],
    explanation: 'This simple pre-post design lacks a control group, which severely threatens internal validity. Changes in outcomes might be due to time trends, seasonal effects, regression to the mean, or concurrent changes in the healthcare system unrelated to the telehealth program. A stronger design would include control clinics that don\'t implement telehealth, allowing for a difference-in-differences analysis. Even better would be a cluster-randomized design where clinics are randomly assigned to implement telehealth or continue usual care.'
  },
  {
    id: 12,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In the context of the Family-Wise Error Rate (FWER), what is the probability of making at least one Type I error when conducting 10 independent hypothesis tests, each with α = 0.05?',
    options: [
      '0.05',
      '0.10',
      '0.40',
      '0.50'
    ],
    correctAnswer: '0.40',
    explanation: 'The Family-Wise Error Rate (FWER) for multiple independent tests is calculated as: FWER = 1 - (1 - α)^k, where k is the number of tests. For 10 tests with α = 0.05: FWER = 1 - (1 - 0.05)^10 = 1 - 0.95^10 = 1 - 0.60 = 0.40. This means there\'s a 40% chance of making at least one Type I error across the 10 tests.'
  },
  {
    id: 13,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the following simulation results in the context of statistical power:',
    content: 'Results from power simulation:\n- Sample size: 200\n- True treatment effect: 2\n- Standard deviation: 4\n- Alpha: 0.05\n- Estimated Power: 0.82',
    correctAnswer: 'The simulation indicates an 82% probability of detecting the true effect of 2 with the given sample size and significance level.',
    keyPhrases: ['statistical power', 'detecting true effect', 'Type II error', 'sample size'],
    explanation: 'The power simulation results indicate that with a sample size of 200, a true treatment effect of 2, and outcome standard deviation of 4, there is an 82% probability of correctly rejecting the null hypothesis when using a significance level of 0.05. This means that if the intervention truly has an effect of 2 units, we would detect this effect as statistically significant in 82% of studies with this design. The remaining 18% represents the probability of a Type II error (failing to detect a true effect).'
  },
  {
    id: 14,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain what the following R code does in the context of experimental design:',
    content: 'dt_strat[, strata := .GRP, by = .(education, age_quintile)]\n\ndt_strat[, treatment := 0]  # Initialize all to control\nfor (s in unique(dt_strat$strata)) {\n  # Get all units in this stratum\n  stratum_units <- dt_strat[strata == s, id]\n  n_units <- length(stratum_units)\n  \n  # Determine number to treat (half, rounded down)\n  n_treat <- floor(n_units/2)\n  \n  # Randomly select units for treatment\n  treated_units <- sample(stratum_units, n_treat)\n  \n  # Assign treatment\n  dt_strat[id %in% treated_units, treatment := 1]\n}',
    correctAnswer: 'The code implements stratified randomization based on education and age quintile.',
    keyPhrases: ['stratified randomization', 'strata', 'balance', 'covariate balance'],
    explanation: 'This code implements stratified randomization. First, it creates strata by combining education and age quintile categories, assigning a unique strata ID to each combination. Then, it initializes all units to control (treatment=0) and loops through each stratum. For each stratum, it identifies all units, calculates how many to assign to treatment (half, rounded down), randomly selects that number of units, and assigns them to the treatment group. This ensures balance on education and age between treatment and control groups.'
  },
  {
    id: 15,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following approaches would likely provide the largest increase in statistical power without increasing sample size?',
    options: [
      'Increasing the significance level from 0.05 to 0.10',
      'Switching from a two-sided to a one-sided hypothesis test',
      'Collecting multiple baseline and endline measurements of a noisy outcome',
      'Using a 75:25 treatment-to-control allocation ratio'
    ],
    correctAnswer: 'Collecting multiple baseline and endline measurements of a noisy outcome',
    explanation: 'Collecting multiple baseline and endline measurements of a noisy outcome can substantially increase power by reducing measurement error and increasing precision. This is especially true for outcomes with low autocorrelation. As discussed in the lecture, multiple waves of data collection can average out noise and provide more precise estimates of changes over time, potentially yielding greater power improvements than the other options listed.'
  },
  {
    id: 16,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the distinction between "re-randomization" and "stratified randomization" approaches, and when each might be preferable.',
    correctAnswer: "Re-randomization generates multiple possible randomizations and selects one with good balance, while stratified randomization divides the sample into strata based on covariates and randomizes separately within each stratum. Stratified is preferable with few categorical covariates, while re-randomization can work with many continuous covariates.",
    explanation: 'Re-randomization involves generating multiple possible randomizations and selecting one with good covariate balance, either using a threshold approach (rejecting randomizations until balance meets criteria) or an optimization approach (selecting the best from many candidates). Stratified randomization divides the sample into strata based on combinations of important covariates and randomizes separately within each stratum, guaranteeing perfect balance on the stratification variables. Stratified randomization is preferable when there are a few key categorical covariates strongly related to outcomes. Re-randomization can be better when there are many continuous covariates or when stratification would create too many small strata.'
  },
  {
    id: 17,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the following approach to verifying balance in a randomized experiment:',
    content: 'After randomizing 5,000 participants to treatment and control groups, researchers conducted t-tests on 20 baseline characteristics. They found significant differences (p < 0.05) on two characteristics: age (p = 0.03) and income (p = 0.04). They concluded that randomization had failed and decided to re-randomize the entire sample.',
    correctAnswer: 'With 20 tests at α=0.05, approximately one is expected to be significant by chance alone; finding two is not surprising and doesn\'t indicate randomization failure.',
    keyPhrases: ['multiple testing', 'false positives', 'expected by chance', 'Type I error'],
    explanation: 'This approach doesn\'t properly account for multiple hypothesis testing. When conducting 20 independent tests at α=0.05, we would expect about 1 test (5% of 20) to be significant by chance alone. Finding 2 significant differences out of 20 tests is not surprising and doesn\'t indicate that randomization failed. The researchers should have used methods to control the family-wise error rate (e.g., Bonferroni correction) or looked at standardized differences rather than p-values. Re-randomizing was unnecessary and could actually introduce bias if done repeatedly until some arbitrary balance criterion is met.'
  },
  {
    id: 18,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In a cluster-randomized trial, what happens to the required sample size as the intracluster correlation coefficient (ICC) increases?',
    options: [
      'It decreases proportionally to the ICC',
      'It remains the same regardless of the ICC',
      'It increases according to the design effect formula: DE = 1 + (m-1) × ICC',
      'It fluctuates unpredictably based on cluster size'
    ],
    correctAnswer: 'It increases according to the design effect formula: DE = 1 + (m-1) × ICC',
    explanation: 'As the intracluster correlation coefficient (ICC) increases, the required sample size increases according to the design effect formula: DE = 1 + (m-1) × ICC, where m is the average cluster size. A higher ICC means participants within a cluster are more similar to each other, effectively reducing the number of independent observations. This reduces statistical power, requiring a larger total sample size to compensate. The design effect (DE) quantifies how much the required sample size needs to be inflated compared to simple random sampling.'
  },
  {
    id: 19,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The following R code is supposed to create and test balance for matched pairs randomization, but contains an error. Identify and correct it:',
    content: 'set.seed(123)\nn <- 100\ndt <- data.table(id = 1:n, age = rnorm(n, 50, 10), income = rnorm(n, 60000, 15000))\n\n# Create pairs based on age only\npairs <- list()\nfor (i in 1:50) {\n  pairs[[i]] <- c(i, i+50)\n}\n\n# Assign treatment within pairs\nfor (i in 1:length(pairs)) {\n  treated_id <- sample(pairs[[i]], 1)\n  dt[id == treated_id, treatment := 1]\n  dt[id != treated_id & id %in% pairs[[i]], treatment := 0]\n}\n\n# Test balance\nt.test(dt[treatment==1, age], dt[treatment==0, age])',
    correctAnswer: 'The matching algorithm pairs units sequentially rather than based on similarity on covariates.',
    keyPhrases: ['matching algorithm', 'similarity', 'covariates', 'matched pairs'],
    explanation: 'The error is in the matching algorithm. The code creates pairs by sequentially grouping the first 50 IDs with the last 50 IDs (i and i+50), rather than matching based on covariate similarity. In proper matched-pair randomization, pairs should be formed based on similarity on important covariates. A correct implementation would calculate distances between units based on age and income (e.g., using Mahalanobis distance), then pair units with the smallest distances. After proper matching, one unit from each pair would be randomly assigned to treatment.'
  },
  {
    id: 20,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What does the MDE (Minimum Detectable Effect) represent in experimental design?',
    options: [
      'The smallest effect size that exists in the population',
      'The average effect size observed in similar studies',
      'The smallest effect size that can be detected with specified significance level and power',
      'The effect size expected based on theoretical models'
    ],
    correctAnswer: 'The smallest effect size that can be detected with specified significance level and power',
    explanation: 'The Minimum Detectable Effect (MDE) represents the smallest true effect size that can be detected with a specified level of statistical power and significance level. It is not the effect size you expect to see or the effect that exists in the population, but rather the detection threshold of your experimental design. If the true effect is smaller than the MDE, your study is unlikely to find a statistically significant result even if an effect exists. The MDE is affected by sample size, variance, significance level, and power.'
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
