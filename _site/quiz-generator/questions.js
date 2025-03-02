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
  },
  {
    id: 21,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which statement best describes the "non-zero probability condition" in experimental assignment mechanisms?',
    options: [
      'Every individual must have the same probability of treatment',
      'Every individual must have some positive probability of receiving each possible treatment',
      'Individuals can be assigned to treatment based on their baseline covariates',
      'The assignment of one individual depends on the assignment of another'
    ],
    correctAnswer: 'Every individual must have some positive probability of receiving each possible treatment',
    explanation: 'A valid assignment mechanism requires that every participant has a non-zero probability of being placed in each arm. Otherwise, the randomization condition is violated.'
  },
  {
    id: 22,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In Bernoulli randomization (coin-flip assignment), which of the following is true compared to complete randomization?',
    options: [
      'Group sizes are always fixed',
      'Balance on covariates is guaranteed',
      'Each individual is assigned independently',
      'It requires knowing the entire sample ahead of time'
    ],
    correctAnswer: 'Each individual is assigned independently',
    explanation: 'In Bernoulli randomization, each participant is independently “flipped” into treatment or control with a specified probability. Group sizes are not fixed, and no covariate balance is guaranteed.'
  },
  {
    id: 23,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following best describes the Stable Unit Treatment Value Assumption (SUTVA)?',
    options: [
      'Treatment effects must remain constant across time',
      'Units cannot drop out once assigned to a condition',
      'The treatment of one individual does not affect another individual’s outcome',
      'The probability of assignment must remain stable at all times'
    ],
    correctAnswer: 'The treatment of one individual does not affect another individual’s outcome',
    explanation: 'SUTVA states there is no interference between units—i.e., one person’s treatment does not affect another’s outcome—and that there are no hidden variations of treatment.'
  },
  {
    id: 24,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In the lecture notes, two main sampling frameworks are discussed for experiments. What distinguishes a super-population approach from a finite-population approach?',
    options: [
      'The super-population approach assumes all potential outcomes are fixed',
      'The finite-population approach assumes data are drawn i.i.d. from an infinite population',
      'The super-population approach aims to generalize results to a larger population distribution',
      'The finite-population approach requires random sampling from an infinite pool'
    ],
    correctAnswer: 'The super-population approach aims to generalize results to a larger population distribution',
    explanation: 'Under the super-population approach, we assume the sample is drawn from a larger hypothetical population (infinite). By contrast, the finite-population approach treats the sample as the entire population of interest.'
  },
  {
    id: 25,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which method is often used as a joint omnibus test for multiple covariates in assessing balance after randomization?',
    options: [
      'Chi-square test for each covariate',
      'F-test in a regression framework',
      'Mann-Whitney U test',
      'Fisher’s exact test for each variable'
    ],
    correctAnswer: 'F-test in a regression framework',
    explanation: 'One approach to checking balance across multiple covariates is to regress the treatment indicator on all covariates, then use the F-statistic for the joint significance test.'
  },
  {
    id: 26,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is a primary advantage of collecting multiple waves of baseline and endline data in an experiment?',
    options: [
      'It eliminates the need for a control group',
      'It ensures that randomization is not violated over time',
      'It can reduce measurement error and improve statistical power for noisy outcomes',
      'It allows you to run separate analyses for each wave without adjusting significance levels'
    ],
    correctAnswer: 'It can reduce measurement error and improve statistical power for noisy outcomes',
    explanation: 'Multiple waves of data collection can average out noise and thus reduce variance in the estimated effect, especially for outcomes with lower autocorrelation.'
  },
  {
    id: 27,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Why might repeated measures (i.e., multiple time points) increase power in an experimental study?',
    options: [
      'They always guarantee a larger sample size',
      'They reduce selection bias through repeated randomization',
      'They exploit within-subject variation, lowering residual variance if the outcome is not perfectly autocorrelated',
      'They allow participants to switch arms, ensuring more balance'
    ],
    correctAnswer: 'They exploit within-subject variation, lowering residual variance if the outcome is not perfectly autocorrelated',
    explanation: 'Repeated measures can help isolate within-subject changes due to treatment, thus reducing noise if the outcome is not highly autocorrelated.'
  },
  {
    id: 28,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'A p-value is best described as:',
    options: [
      'The probability that the null hypothesis is false',
      'The probability of observing a statistic at least as extreme as the one obtained, assuming the null hypothesis is true',
      'The probability that the treatment has no effect on outcomes',
      'The proportion of times the null hypothesis is rejected in repeated experiments'
    ],
    correctAnswer: 'The probability of observing a statistic at least as extreme as the one obtained, assuming the null hypothesis is true',
    explanation: 'By definition, a p-value is the probability of getting a result at least as extreme as the observed one if the null hypothesis were true.'
  },
  {
    id: 29,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'A 95% confidence interval for an estimate means that:',
    options: [
      'It contains the true parameter 95% of the time for this specific sample',
      'There is a 95% chance the true parameter lies within the calculated interval',
      'If the study is repeated many times, 95% of such intervals would include the true parameter',
      'We are 95% confident the null hypothesis is false'
    ],
    correctAnswer: 'If the study is repeated many times, 95% of such intervals would include the true parameter',
    explanation: 'In frequentist terms, if you repeated the experiment infinitely many times and calculated the CI each time, 95% of those intervals would contain the true parameter.'
  },
  {
    id: 30,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Type I error (α) in hypothesis testing refers to:',
    options: [
      'Failing to reject the null hypothesis when it is false',
      'Rejecting the null hypothesis when it is actually true',
      'Using an incorrect test statistic for the data distribution',
      'Not calculating post-hoc power properly'
    ],
    correctAnswer: 'Rejecting the null hypothesis when it is actually true',
    explanation: 'A Type I error is a false positive—concluding there is an effect when there is none.'
  },
  {
    id: 31,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following is NOT one of the typical four key exclusion restrictions necessary in an ideal randomized experiment setup?',
    options: [
      'Stable Unit Treatment Value Assumption (SUTVA)',
      'Observability of outcomes',
      'Complete compliance with assigned treatment',
      'Absence of random error in measurement'
    ],
    correctAnswer: 'Absence of random error in measurement',
    explanation: 'The four typical key restrictions are SUTVA, statistical independence, observability, and complete compliance. Random measurement error can still be present; it just affects variance, not bias.'
  },
  {
    id: 32,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'In cluster-randomized trials, how does an increasing intracluster correlation coefficient (ICC) affect power?',
    options: [
      'Power increases because units within a cluster are more alike',
      'Power remains the same as long as cluster sizes are uniform',
      'Power decreases, requiring more clusters to maintain the same power',
      'Power is unaffected by ICC'
    ],
    correctAnswer: 'Power decreases, requiring more clusters to maintain the same power',
    explanation: 'A higher ICC means participants within a cluster have correlated outcomes, effectively reducing the number of independent observations.'
  },
  {
    id: 33,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which best describes the MIDA framework as discussed in the course?',
    options: [
      'A four-step approach to analyzing missing data',
      'A structured way to define the Model, Inquiry, Data strategy, and Answer strategy',
      'A set of advanced machine learning tools for big data experiments',
      'A specialized method for dealing with multiple hypothesis testing corrections'
    ],
    correctAnswer: 'A structured way to define the Model, Inquiry, Data strategy, and Answer strategy',
    explanation: 'The MIDA framework helps in designing and diagnosing research designs: M for Model, I for Inquiry, D for Data strategy, A for Answer strategy.'
  },
  {
    id: 34,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Fisher’s randomization test is based on:',
    options: [
      'Approximating the distribution of the estimator with a normal distribution',
      'Permuting the labels of who was treated and who was not to derive the distribution of the test statistic',
      'Bayesian posterior inference using conjugate priors',
      'Using cluster-robust standard errors for hypothesis testing'
    ],
    correctAnswer: 'Permuting the labels of who was treated and who was not to derive the distribution of the test statistic',
    explanation: 'Fisher’s exact randomization test relies on the fact that under the null, re-labeling treatment assignments should not systematically change the outcomes, providing a direct test of the null.'
  },
  {
    id: 35,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'According to the lecture on reproducible research, which statement is true?',
    options: [
      'Version control is optional if you are the only person working on a project',
      'Using a literate programming environment helps avoid copy-paste errors between code and results',
      'Manual edits to outputs are recommended to ensure accurate final figures',
      'Reproducibility concerns only the final results, not intermediate steps'
    ],
    correctAnswer: 'Using a literate programming environment helps avoid copy-paste errors between code and results',
    explanation: 'Literate programming tools like Quarto and R Markdown integrate code and narrative in one place, preventing copy-paste mistakes and facilitating transparency.'
  },
  {
    id: 36,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Why is setting and preserving a random seed considered best practice in reproducible research?',
    options: [
      'It guarantees that results will generalize to other datasets',
      'It ensures that the random number generators used in the analysis can be recreated exactly for reproducibility',
      'It allows multiple researchers to collaborate in real-time without merge conflicts',
      'It makes the p-values smaller by reducing randomness in the data'
    ],
    correctAnswer: 'It ensures that the random number generators used in the analysis can be recreated exactly for reproducibility',
    explanation: 'A random seed allows any random processes (e.g., randomization, bootstrapping) to be replicated exactly, facilitating reproducibility.'
  },
  {
    id: 37,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'The difference-in-means estimator for the Average Treatment Effect (ATE) is typically calculated as:',
    options: [
      'The sum of outcomes in treatment divided by the sum of outcomes in control',
      'Mean outcome in the treatment group minus mean outcome in the control group',
      'A logistic function of the ratio of means in treatment and control',
      'The average potential outcome minus the average realized outcome'
    ],
    correctAnswer: 'Mean outcome in the treatment group minus mean outcome in the control group',
    explanation: 'Under random assignment, the standard estimator for ATE is the sample mean in treatment minus the sample mean in control.'
  },
  {
    id: 38,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Unconfoundedness (as an assignment condition) implies that:',
    options: [
      'Outcome data are collected at both baseline and endline',
      'Treatment is assigned independently of potential outcomes given observed covariates',
      'All unobserved variables are irrelevant',
      'Units have a zero probability of being assigned to certain treatments'
    ],
    correctAnswer: 'Treatment is assigned independently of potential outcomes given observed covariates',
    explanation: 'Unconfoundedness means that once you condition on covariates, the assignment to treatment is effectively random with respect to the potential outcomes.'
  },
  {
    id: 39,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is a key difference between a within-subject design and a between-subject design?',
    options: [
      'Within-subject designs allow each participant to act as their own control, while between-subject designs compare different participants in different arms',
      'Within-subject designs require cluster assignment, while between-subject designs do not',
      'Between-subject designs are always unethical compared to within-subject designs',
      'Within-subject designs never need random assignment'
    ],
    correctAnswer: 'Within-subject designs allow each participant to act as their own control, while between-subject designs compare different participants in different arms',
    explanation: 'In a within-subject (repeated-measures) design, the same participant experiences multiple conditions. In between-subject designs, separate groups of participants are allocated to different conditions.'
  },
  {
    id: 40,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'If you conduct many hypothesis tests without correction, which phenomenon are you most concerned about?',
    options: [
      'Inflated Type II error',
      'Inflated Type I error (Family-Wise Error Rate)',
      'Lack of randomization integrity',
      'Overly conservative p-values'
    ],
    correctAnswer: 'Inflated Type I error (Family-Wise Error Rate)',
    explanation: 'Multiple testing without correction inflates the chance of at least one false positive, raising the Family-Wise Error Rate.'
  },
  {
    id: 41,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'How does the Bonferroni correction address multiple hypothesis testing?',
    options: [
      'By adding extra dummy variables to the regression',
      'By reducing the significance level to α/k for k tests',
      'By forcing the sample size to increase for each new hypothesis',
      'By pooling all tests into a single combined test statistic'
    ],
    correctAnswer: 'By reducing the significance level to α/k for k tests',
    explanation: 'The Bonferroni correction divides the original α by the number of comparisons k, ensuring the family-wise error rate does not exceed α.'
  },
  {
    id: 42,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'The Holm method for multiple testing differs from Bonferroni primarily because:',
    options: [
      'It increases the p-values for each test by a factor of k',
      'It sequentially adjusts the significance level in an ascending order of p-values',
      'It requires a parametric assumption on the distribution of p-values',
      'It is only applicable if the covariates are normally distributed'
    ],
    correctAnswer: 'It sequentially adjusts the significance level in an ascending order of p-values',
    explanation: 'The Holm procedure sorts the p-values from smallest to largest and adjusts them stepwise, typically making it less conservative than Bonferroni.'
  },
  {
    id: 43,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which of the following is a primary benefit of using renv in an R project?',
    options: [
      'It automatically corrects errors in your R scripts',
      'It provides a local environment that records package versions for reproducibility',
      'It replaces the need for Git or other version control systems',
      'It eliminates the need to specify random seeds'
    ],
    correctAnswer: 'It provides a local environment that records package versions for reproducibility',
    explanation: 'The renv package allows users to capture and restore a project’s R package dependencies, ensuring reproducibility over time.'
  },
  {
    id: 44,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Which statement best reflects a recommended practice for project structure in reproducible research?',
    options: [
      'Place all scripts and data files in a single folder named "Stuff"',
      'Manually edit output figures to finalize them before publication',
      'Store raw data, processed data, scripts, and outputs in separate, clearly named folders',
      'Never include a README file to avoid confusion'
    ],
    correctAnswer: 'Store raw data, processed data, scripts, and outputs in separate, clearly named folders',
    explanation: 'A logical project structure is crucial: keep raw data, processed data, code, and outputs distinct and well-labeled for clarity and reproducibility.'
  },
  {
    id: 45,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is the primary purpose of using Git (and GitHub) in a research project?',
    options: [
      'To store only final versions of the code to reduce repository size',
      'To track changes over time and facilitate collaboration',
      'To automatically run all code each time a file is saved',
      'To lock code so it cannot be changed further'
    ],
    correctAnswer: 'To track changes over time and facilitate collaboration',
    explanation: 'Git is a version control system that records every change to the code, enabling branching, merging, and collaborative development.'
  },
  {
    id: 46,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Why is literate programming (e.g., R Markdown or Quarto) beneficial in reproducible research?',
    options: [
      'It separates code and narrative into different files',
      'It automates the process of emailing code to collaborators',
      'It integrates code, results, and text in one place, reducing copy-paste errors',
      'It automatically fixes any code bugs found in the script'
    ],
    correctAnswer: 'It integrates code, results, and text in one place, reducing copy-paste errors',
    explanation: 'Literate programming seamlessly weaves code, text, and outputs, preventing inconsistencies between code and reported results.'
  },
  {
    id: 47,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'When using re-randomization for balance, what is one difference between the threshold approach and the optimization approach?',
    options: [
      'Threshold approach tests each randomization against a fixed criterion, while optimization approach picks the best from many randomizations',
      'Threshold approach is only valid for large samples, while optimization approach is for small samples',
      'Threshold approach uses a deterministic formula, while optimization approach uses purely random assignment',
      'They are essentially the same method'
    ],
    correctAnswer: 'Threshold approach tests each randomization against a fixed criterion, while optimization approach picks the best from many randomizations',
    explanation: 'In the threshold approach, you keep generating randomizations until one meets the p-value or balance criterion. The optimization approach compares a large number of randomizations and selects the one with the best (lowest) imbalance metric.'
  },
  {
    id: 48,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Why might matched pairs randomization reduce variance compared to simple random assignment?',
    options: [
      'Because it increases the sample size in each arm',
      'Because it ignores baseline characteristics',
      'Because pairing similar units can remove variation due to those baseline characteristics',
      'Because it always ensures a 50:50 split in each pair'
    ],
    correctAnswer: 'Because pairing similar units can remove variation due to those baseline characteristics',
    explanation: 'Matched pairs design pairs up participants based on similarity in prognostic variables, which reduces unexplained variance in the outcome.'
  },
  {
    id: 49,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'What is a key difference between random sampling and random assignment in an experiment?',
    options: [
      'Random sampling ensures the sample represents the larger population, while random assignment ensures internal validity by creating comparable groups',
      'Random sampling ensures no attrition, while random assignment ensures perfect compliance',
      'Random sampling always occurs after the sample has been selected, while random assignment always occurs before',
      'There is no difference; both terms mean the same in experimental research'
    ],
    correctAnswer: 'Random sampling ensures the sample represents the larger population, while random assignment ensures internal validity by creating comparable groups',
    explanation: 'Random sampling pertains to how you select participants from a population (external validity), while random assignment pertains to how you allocate them to treatment/control (internal validity).'
  },
  {
    id: 50,
    type: QUESTION_TYPES.MULTIPLE_CHOICE,
    question: 'Figure 8.1 in the Data Strategy DAG highlights which key elements that are set by the researcher?',
    options: [
      'Sampling, treatment assignment, and measurement procedures',
      'Outcome, unobserved heterogeneity, and compliance',
      'Potential outcomes, random seeds, and environment management',
      'Merge conflicts, commit messages, and code comments'
    ],
    correctAnswer: 'Sampling, treatment assignment, and measurement procedures',
    explanation: 'According to the diagram, the researcher controls the sampling (S), assignment (Z), and measurement (Q) nodes, which in turn affect the data strategy.'
  },
  {
    id: 51,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Define "internal validity" in the context of experimental design.',
    correctAnswer: 'Internal validity is the degree to which observed changes in the dependent variable can be causally attributed to the intervention or treatment.',
    explanation: 'Internal validity focuses on ensuring that any differences in outcomes are due to the treatment and not confounders or biases.'
  },
  {
    id: 52,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'State the fundamental reason we cannot identify individual treatment effects in the potential outcomes framework.',
    correctAnswer: 'Because for each individual, we can only observe one potential outcome (treated or control) but not both.',
    explanation: 'This is the "missing data" aspect of causal inference: we never see the counterfactual outcome for the same individual.'
  },
  {
    id: 53,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What does the acronym "SUTVA" stand for?',
    correctAnswer: 'Stable Unit Treatment Value Assumption',
    explanation: 'SUTVA includes the assumption that there is no interference between units and no hidden variations of treatment.'
  },
  {
    id: 54,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Briefly explain the concept of "attrition bias" in an experimental study.',
    correctAnswer: 'Attrition bias occurs when participants drop out of a study in a way that is systematically related to treatment or outcomes, potentially skewing the results.',
    explanation: 'Differential dropout across treatment and control groups can bias the estimated treatment effect, threatening internal validity.'
  },
  {
    id: 55,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What is the key difference between "finite-population ATE (SATE)" and "super-population ATE"?',
    correctAnswer: 'Finite-population ATE pertains only to the specific sample or population studied, whereas super-population ATE generalizes to a broader, hypothetical population distribution.',
    explanation: 'Under the finite-population perspective, potential outcomes are fixed in the sample. Under the super-population framework, units are viewed as draws from a larger distribution.'
  },
  {
    id: 56,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Why might baseline covariates be included in a regression model for analyzing experimental data, even if we have randomization?',
    correctAnswer: 'Including strong predictors of the outcome reduces residual variance, increasing precision and power, even though randomization ensures no bias.',
    explanation: 'Controlling for prognostic baseline covariates can improve statistical efficiency by explaining part of the outcome variance.'
  },
  {
    id: 57,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What is a key purpose of version control in reproducible research?',
    correctAnswer: 'To track the history of changes in code and documents, enabling collaboration and rollback if necessary.',
    explanation: 'Version control systems like Git record incremental changes over time, facilitating transparency and team collaboration.'
  },
  {
    id: 58,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Define a "time-traveling perspective" in reproducible research, as mentioned in the lecture notes.',
    correctAnswer: 'It means designing your code and documentation so a future (or past) version of yourself can understand and replicate the analyses without confusion.',
    explanation: 'The lecture uses the analogy of a "time-traveling version of yourself" to emphasize clarity and thoroughness in project organization.'
  },
  {
    id: 59,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'State one advantage of a randomized phase-in design in health policy evaluation.',
    correctAnswer: 'It can be more politically acceptable as eventually everyone receives the intervention, while still allowing for causal inference in the interim.',
    explanation: 'A phased rollout addresses equity concerns and ensures that all units eventually receive the intervention, but careful analysis is needed to account for time trends.'
  },
  {
    id: 60,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'In the context of power calculations, what does "MDE" stand for, and what does it represent?',
    correctAnswer: 'MDE stands for Minimum Detectable Effect, which is the smallest true effect size the study can reliably detect given its design and power.',
    explanation: 'The MDE depends on sample size, variance, and desired power/significance levels. It defines the threshold of detectability.'
  },
  {
    id: 61,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain the concept of "observability" as an exclusion restriction in experimental research.',
    correctAnswer: 'Observability means outcomes must be measured (or observable) for all individuals in both treatment and control, otherwise bias can result from missing data.',
    explanation: 'If outcomes are not observed or are systematically missing, the estimated treatment effect can be biased.'
  },
  {
    id: 62,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Why is it important to commit changes with descriptive messages in Git?',
    correctAnswer: 'It provides a clear record of what changed and why, aiding collaboration and future troubleshooting.',
    explanation: 'Meaningful commit messages are crucial for understanding the evolution of the project and diagnosing issues.'
  },
  {
    id: 63,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Name one key difference in analyzing cluster-randomized trials vs. individually randomized trials.',
    correctAnswer: 'In cluster-randomized trials, you must account for intracluster correlation (e.g., via cluster-robust standard errors or mixed models).',
    explanation: 'Ignoring clustering underestimates standard errors, inflating Type I error rates.'
  },
  {
    id: 64,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Provide one reason why matched pairs can be preferable to simple stratification in small samples.',
    correctAnswer: 'Matched pairs can ensure very close matches on key covariates, substantially reducing within-pair variance and improving power.',
    explanation: 'In small samples, forming pairs can exploit strong within-pair similarity, often more finely than broader strata.'
  },
  {
    id: 65,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'In the finite-population approach to inference, why are potential outcomes considered fixed rather than random?',
    correctAnswer: 'Because we treat the existing sample as the entire population of interest, so each unit’s potential outcomes are not viewed as draws from a larger distribution.',
    explanation: 'Under the finite-population view, randomness stems solely from treatment assignment, not from sampling.'
  },
  {
    id: 66,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Briefly define the "assignment mechanism" in an experimental study.',
    correctAnswer: 'The assignment mechanism is the rule or process by which participants are allocated to different treatments (e.g., random assignment).',
    explanation: 'It describes how and why each unit ended up in a particular treatment arm, which is crucial for causal inference.'
  },
  {
    id: 67,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'Explain why "environment management" tools (like renv) are important for reproducible R analyses.',
    correctAnswer: 'They lock in the specific versions of R packages used, preventing future updates from breaking the code or altering results.',
    explanation: 'Without environment management, updated packages can yield different outcomes, undermining reproducibility.'
  },
  {
    id: 68,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'What does the term "design effect" refer to in the context of clustered experiments?',
    correctAnswer: 'It is the factor by which the sample size must be inflated compared to a simple random sample due to within-cluster correlation.',
    explanation: 'A higher design effect means you need more total participants (and clusters) to maintain the same power.'
  },
  {
    id: 69,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'In randomization-based inference, what is the role of "permutation tests"?',
    correctAnswer: 'Permutation tests estimate the distribution of a test statistic by reassigning treatment labels to gauge how extreme the observed effect is under the null.',
    explanation: 'They rely on the idea that if the null is true, permuting who got treatment vs. control should not systematically change outcomes.'
  },
  {
    id: 70,
    type: QUESTION_TYPES.SHORT_ANSWER,
    question: 'When analyzing data from a matched-pair design, why might you include pair fixed effects in a regression model?',
    correctAnswer: 'Pair fixed effects control for any differences within each matched pair, reducing error variance and improving the precision of the treatment effect estimate.',
    explanation: 'Pair fixed effects effectively remove within-pair baseline differences, isolating the treatment’s impact.'
  },

  // =============== 20 CODE_EXPLANATION QUESTIONS (IDs 71 - 90) ===============
  {
    id: 71,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain what the following R code is doing in the context of checking balance post-randomization:',
    content: `balance_vars <- c("age", "income")
results <- data.table(variable = character(), p_value = numeric())
for (var in balance_vars) {
  test_res <- t.test(dt[treatment==1, get(var)], dt[treatment==0, get(var)])
  results <- rbind(results, data.table(variable=var, p_value=test_res$p.value))
}
results`,
    correctAnswer: 'It loops over specified variables, performs a t-test for each to compare treatment vs. control, and stores the p-values in a results table.',
    keyPhrases: ['post-randomization balance', 't-test', 'looping over variables', 'p-value'],
    explanation: 'The code creates a table of p-values for each specified variable to check if the mean differs significantly between treatment and control groups.'
  },
  {
    id: 72,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'What is the purpose of this snippet in randomization?',
    content: `dt[, random_num := runif(.N)]
setorder(dt, random_num)
dt[, treatment := 0]
dt[1:(.N/2), treatment := 1]`,
    correctAnswer: 'It implements complete randomization by generating random numbers for each observation, sorting by that random number, and assigning the first half to treatment and the rest to control.',
    keyPhrases: ['complete randomization', 'sorting', 'random_num', 'assignment'],
    explanation: 'By ordering the dataset on a uniform random draw, we effectively shuffle the rows. Then we assign the first half as treatment, ensuring exactly 50% treatment.'
  },
  {
    id: 73,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain what this code does in terms of environment management:',
    content: `library(renv)
renv::init()
renv::snapshot()`,
    correctAnswer: 'It initializes a local R environment for the project and takes a snapshot of the installed packages, creating a reproducible record of dependencies.',
    keyPhrases: ['renv', 'environment management', 'snapshot', 'package versions'],
    explanation: 'The renv package helps manage project-specific libraries. init() creates a private library, and snapshot() records the current package versions in a lockfile.'
  },
  {
    id: 74,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Interpret this snippet that uses the "fixest" package:',
    content: `library(fixest)
est <- feols(outcome ~ treatment | strata, data = dt)
summary(est)`,
    correctAnswer: 'It runs a regression of outcome on treatment with fixed effects for strata. This accounts for differences across strata in the data.',
    keyPhrases: ['feols', 'fixed effects', 'stratification', 'linear regression'],
    explanation: 'The model formula outcome ~ treatment | strata indicates that "strata" are included as fixed effects, controlling for any stratum-level unobserved heterogeneity.'
  },
  {
    id: 75,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain how the code below implements Bernoulli trial assignment and then tallies group sizes:',
    content: `dt[, treatment := rbinom(.N, 1, 0.5)]
dt[, .N, by = treatment]`,
    correctAnswer: 'Each row is assigned to treatment with probability 0.5 independently, then the code counts how many ended up in each group.',
    keyPhrases: ['Bernoulli randomization', 'rbinom', 'group count'],
    explanation: 'The rbinom call with size=1 and prob=0.5 flips a coin for each row. The second line groups by treatment to show the final distribution of assignments.'
  },
  {
    id: 76,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'What does the following code achieve?',
    content: `dt[, pair_id := NA_integer_]
dt[, treatment := 0]
for (i in seq(1, .N, by=2)) {
  dt[ i:(i+1), pair_id := (i+1)/2 ]
  treat_id <- sample(i:(i+1), 1)
  dt[treat_id, treatment := 1]
}`,
    correctAnswer: 'It forms pairs of consecutive rows and randomly assigns one unit in each pair to treatment.',
    keyPhrases: ['matched pairs approach (simplified)', 'forming pairs', 'assigning treatment'],
    explanation: 'The loop increments by 2, grouping pairs of rows, assigning a shared pair_id, then randomly selects one row in each pair to set treatment=1.'
  },
  {
    id: 77,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Examine the code snippet that calculates standardized differences for balance assessment:',
    content: `sd_treat <- sd(dt[treatment==1, x])
sd_ctrl <- sd(dt[treatment==0, x])
mean_treat <- mean(dt[treatment==1, x])
mean_ctrl <- mean(dt[treatment==0, x])
pooled_sd <- sqrt((sd_treat^2 + sd_ctrl^2)/2)
std_diff <- (mean_treat - mean_ctrl)/pooled_sd`,
    correctAnswer: 'It computes the standardized difference between treatment and control means for variable x, which is used to assess covariate balance independent of sample size.',
    keyPhrases: ['standardized difference', 'balance assessment', 'pooled_sd', 'mean_treat'],
    explanation: 'This formula is a classic approach to measuring balance, normalizing the difference by the pooled standard deviation.'
  },
  {
    id: 78,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Describe the function of the following chunk of code in Quarto or R Markdown:',
    content: "```{r}\nsummary(lm(outcome ~ treatment + age + factor(site), data=dt))\n```",
    correctAnswer: 'It runs a linear regression of outcome on treatment, age, and site (as a factor), then displays a summary in the knitted document.',
    keyPhrases: ['literate programming', 'inline code', 'lm()', 'knit output'],
    explanation: 'In a Quarto/R Markdown chunk, the code is executed and the results appear directly in the rendered document, ensuring the analysis is transparently integrated with the text.'
  },
  {
    id: 79,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain the effect of the following code on a data table "dt":',
    content: `set.seed(101)
dt[, perm_label := sample(treatment)]
dt[, perm_diff := mean(outcome[perm_label==1]) - mean(outcome[perm_label==0])]`,
    correctAnswer: 'This randomly permutes the treatment labels and calculates the difference in mean outcome under that permutation, used in randomization-based inference or permutation tests.',
    keyPhrases: ['permutation test', 'randomly re-label', 'difference in means'],
    explanation: 'By sampling the treatment vector, the code creates a new label that is effectively random, then calculates an outcome difference for that randomized label.'
  },
  {
    id: 80,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'What is happening in this chunk related to power simulation?',
    content: `simulate_power <- function(N, true_tau, sigma, reps=1000) {
  rejections <- 0
  for (i in 1:reps) {
    y <- rnorm(N, mean = true_tau, sd = sigma)
    ttest <- t.test(y, mu=0)
    if (ttest$p.value < 0.05) rejections <- rejections + 1
  }
  return(rejections / reps)
}`,
    correctAnswer: 'The function simulates data under a true effect "true_tau," performs a one-sample t-test against 0, and calculates the proportion of rejections across many replications (power).',
    keyPhrases: ['power simulation', 't.test', 'true effect', 'proportion of rejections'],
    explanation: 'Each loop generates data from a normal distribution with mean = true_tau, performs a t-test, and increments a counter if the null is rejected.'
  },
  {
    id: 81,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Interpret this chunk used for block (stratified) randomization:',
    content: `for (stratum in unique(dt$strata)) {
  idx <- which(dt$strata == stratum)
  n_stratum <- length(idx)
  n_treat <- floor(n_stratum / 2)
  treat_ids <- sample(idx, n_treat)
  dt[treat_ids, treatment := 1]
}`,
    correctAnswer: 'It loops over each stratum, calculates how many units to treat (about half), randomly selects those units, and sets treatment=1. This enforces balanced assignment within each stratum.',
    keyPhrases: ['block randomization', 'looping over strata', 'balanced assignment'],
    explanation: 'By randomizing within each stratum separately, the code ensures equal or nearly equal treatment representation in each block.'
  },
  {
    id: 82,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain what the code snippet below does to account for cluster effects in an analysis:',
    content: `library(clubSandwich)
model <- lm(outcome ~ treatment + x, data=dt)
res <- coef_test(model, vcov = "CR2", cluster = dt$cluster_id)`,
    correctAnswer: 'It fits a linear model for the outcome and then uses cluster-robust standard errors (CR2) by clustering on "cluster_id" to properly account for within-cluster correlation.',
    keyPhrases: ['cluster-robust standard errors', 'CR2', 'clubSandwich package'],
    explanation: 'The "coef_test" function from clubSandwich re-estimates standard errors that are robust to within-cluster dependence.'
  },
  {
    id: 83,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'In the context of re-randomization, what does the following code do?',
    content: `balance_criterion <- function(d) {
  abs(mean(d[treatment==1]$age) - mean(d[treatment==0]$age)) < 2
}
attempts <- 0
while (TRUE) {
  dt[, treatment := rbinom(.N, 1, 0.5)]
  attempts <- attempts + 1
  if (balance_criterion(dt)) break
}`,
    correctAnswer: 'It keeps randomizing treatment until the mean difference in age between groups is under 2, counting how many attempts it takes.',
    keyPhrases: ['re-randomization', 'threshold approach', 'balance_criterion', 'while loop'],
    explanation: 'The loop continues to generate random assignments until the user-defined condition on age balance is satisfied.'
  },
  {
    id: 84,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'What does this chunk accomplish in a Quarto or R Markdown workflow?',
    content: "```{r}\nrendered_plot <- ggplot(dt, aes(x = treatment, y = outcome)) + geom_boxplot()\nrendered_plot\n```",
    correctAnswer: 'It creates a boxplot of outcome by treatment group and displays it in the final knitted (or rendered) document.',
    keyPhrases: ['R Markdown chunk', 'ggplot', 'boxplot', 'render'],
    explanation: 'Within a code chunk, the code is executed, producing a boxplot comparing outcome distributions by treatment.'
  },
  {
    id: 85,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Interpret the functionality of the following R function used in diagnosing design performance:',
    content: `diagnose_design <- function(N, effect, runs=500) {
  power_count <- 0
  for (r in 1:runs) {
    # Data generation
    dt <- data.frame(y=rnorm(N, effect, 1), d=rbinom(N,1,0.5))
    est <- t.test(dt$y[dt$d==1], dt$y[dt$d==0])
    if (est$p.value < 0.05) power_count <- power_count + 1
  }
  return(power_count / runs)
}`,
    correctAnswer: 'This function simulates data repeatedly under a specific effect and returns the fraction of times the t-test rejects, i.e., empirical power.',
    keyPhrases: ['simulation', 'diagnose_design', 'empirical power', 't.test'],
    explanation: 'By repeatedly generating data with a known effect, we can see how often the test rejects at α=0.05, thus estimating power.'
  },
  {
    id: 86,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain the role of this code snippet in a matched pair randomization scheme:',
    content: `dt[, distance := (age - mean(age))^2 + (income - mean(income))^2]
setorder(dt, distance)`,
    correctAnswer: 'It calculates a basic measure of distance from the mean (for two covariates) and sorts the dataset by that distance, potentially aiding in pairing similar units.',
    keyPhrases: ['distance measure', 'sorting', 'match units', 'pre-processing step'],
    explanation: 'Though simplistic, this snippet tries to group units with minimal distance from a central point. Real matching would usually measure pairwise distances, but this is a simplified approach.'
  },
  {
    id: 87,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'What is the intention of the following approach in a factorial design?',
    content: `dt[, A := sample(c(0,1), .N, replace=TRUE)]
dt[, B := sample(c(0,1), .N, replace=TRUE)]
dt[, group := paste0("A", A, "B", B)]`,
    correctAnswer: 'It randomly assigns each unit to two binary interventions (A and B), creating four possible groups: (A0B0, A1B0, A0B1, A1B1).',
    keyPhrases: ['factorial design', 'binary factors', 'group labeling'],
    explanation: 'Interventions A and B are each assigned randomly, so each participant belongs to one of four cells in a 2×2 factorial design.'
  },
  {
    id: 88,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'In a data cleaning context, describe the role of the code below in a reproducible pipeline:',
    content: `dt_raw <- fread("raw_data.csv")
dt_clean <- dt_raw[!is.na(outcome)]
write.csv(dt_clean, "data/processed/clean_data.csv", row.names=FALSE)`,
    correctAnswer: 'It reads the raw data, drops rows with missing outcomes, and writes the cleaned dataset to a separate file for consistent data processing.',
    keyPhrases: ['data cleaning', 'fread', 'handling missing values', 'processed data output'],
    explanation: 'Storing a cleaned version in a "processed" folder is part of good project structure, maintaining raw data separate from transformations.'
  },
  {
    id: 89,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Explain the use of the following chunk in a power calculation scenario:',
    content: `library(pwr)
pwr.t.test(d = 0.4, power = 0.8, sig.level = 0.05, type = "two.sample")`,
    correctAnswer: 'It uses the pwr package to determine sample size or effect size relationships for a two-sample t-test with effect size d=0.4, power=0.8, and alpha=0.05.',
    keyPhrases: ['pwr package', 'power calculation', 'two.sample t-test', 'effect size'],
    explanation: 'pwr.t.test solves for the missing parameter (usually sample size) given effect size, power, and alpha, guiding experimental design.'
  },
  {
    id: 90,
    type: QUESTION_TYPES.CODE_EXPLANATION,
    question: 'Interpret this snippet used in a repeated-measures analysis in R:',
    content: `library(lme4)
mod <- lmer(outcome ~ treatment + time + (1|id), data=long_data)
summary(mod)`,
    correctAnswer: 'It fits a linear mixed-effects model with a random intercept for each individual (id), accounting for repeated measures over time and the effect of treatment.',
    keyPhrases: ['lme4', 'lmer', 'repeated measures', 'random intercept'],
    explanation: 'The random intercept (1|id) captures individual-level variation across repeated time points, while fixed effects estimate treatment and time effects.'

  },
  {
    id: 91,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The code below tries to implement a difference-in-means estimator, but has a logical error. Identify and correct it:',
    content: `treated_mean <- mean(dt[treatment==1]$outcome)
control_mean <- mean(dt[treatment==1]$outcome)
diff_in_means <- treated_mean - control_mean`,
    correctAnswer: 'They used treatment==1 for both means. The control group mean should use treatment==0.',
    keyPhrases: ['difference in means', 'logical indexing error', 'treatment==0'],
    explanation: 'The correct code is:\n```\ntreated_mean <- mean(dt[treatment==1]$outcome)\ncontrol_mean <- mean(dt[treatment==0]$outcome)\ndiff_in_means <- treated_mean - control_mean\n```'
  },
  {
    id: 92,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'This code is intended to produce a stratified randomization, but the final treatment groups are extremely imbalanced. Fix it:',
    content: `set.seed(42)
for (s in unique(dt$strata)) {
  idx <- which(dt$strata == s)
  dt[idx, treatment := rbinom(length(idx), 1, 0.8)]
}`,
    correctAnswer: 'Change p=0.8 to around 0.5 or calculate half the stratum for treatment to ensure balanced assignment, e.g. dt[idx, treatment := ifelse(runif(length(idx)) < 0.5,1,0)].',
    keyPhrases: ['stratified randomization', 'imbalanced assignment', 'p=0.8 fix'],
    explanation: 'A high probability (0.8) in each stratum can create an overall imbalance. To achieve near 50-50, set p=0.5 or use a direct half-split approach.'
  },
  {
    id: 93,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Identify and correct the mistake in this attempt to compute cluster-robust standard errors using the sandwich package:',
    content: `model <- lm(y ~ d + X, data=dt)
coeftest(model, vcov = vcovHC(model, type="HC1", cluster = ~ cluster_id))`,
    correctAnswer: 'The argument "cluster = ~ cluster_id" is not valid in vcovHC. We should use cluster=dt$cluster_id with "type=\'HC1\'" if we want cluster-robust SEs in sandwich. Alternatively, use vcovCL in sandwich.',
    keyPhrases: ['sandwich package', 'cluster argument', 'vcovHC', 'coeftest'],
    explanation: 'In the sandwich package, the correct usage might be: `coeftest(model, vcov = vcovCL(model, cluster=~cluster_id))` or pass an explicit vector if needed.'
  },
  {
    id: 94,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The following code tries to do a "paired t-test" for matched pairs, but it is incorrect. Fix it:',
    content: `t.test(dt[treatment==1]$outcome, dt[treatment==0]$outcome, paired=TRUE, mu=0)`,
    correctAnswer: 'We must ensure the two samples are matched pairs for the same units. We need a wide format or to merge by pair ID. E.g. pivot so that each row has (outcome_treated, outcome_control) for the same pair, then do t.test(x$treated, x$control, paired=TRUE).',
    keyPhrases: ['paired t-test', 'matched pairs', 'wide format', 'paired=TRUE'],
    explanation: 'A paired t-test requires each observation in group A to match exactly with a corresponding observation in group B. Currently, the code uses separate subsets that don’t pair data by the same ID or pair.'
  },
  {
    id: 95,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'In the snippet below, the user wants to re-randomize until the standard deviations of age are similar in treatment and control. Spot the logic error:',
    content: `while (TRUE) {
  dt[, treat := rbinom(.N, 1, 0.5)]
  if (sd(dt[ treat==1 ]$age) - sd(dt[ treat==0 ]$age) < 0.1) break
}`,
    correctAnswer: 'They forgot to take the absolute difference. Use abs(sd(treat==1) - sd(treat==0)) < 0.1. Otherwise a negative difference passes the check incorrectly.',
    keyPhrases: ['re-randomization threshold', 'absolute difference', 'sd difference'],
    explanation: 'If the difference is negative and bigger in magnitude than 0.1, it erroneously meets the condition. Use abs(...) for comparing magnitude.'
  },
  {
    id: 96,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The code is supposed to fit a random intercepts model using lme4, but it errors out. Fix the formula mistake:',
    content: `library(lme4)
mod <- lmer(outcome ~ treat + time + (id), data=dt)`,
    correctAnswer: 'We need parentheses around 1|id for random intercept, e.g. (1|id). The correct syntax is mod <- lmer(outcome ~ treat + time + (1|id), data=dt).',
    keyPhrases: ['lmer formula', 'random intercept', '(1|id)'],
    explanation: 'In lme4, random effects are specified as (1|id) or (slope|id). Writing (id) is incorrect syntax.'
  },
  {
    id: 97,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Identify the error in this code that attempts to finalize a Quarto project environment using renv:',
    content: `library(renv)
renv::init()
renv::restore()
renv::init() # again
renv::snapshot()`,
    correctAnswer: 'They call init() twice. After init() and restore(), calling init() again can overwrite the setup. The second init() is unnecessary. The correct sequence is init(), restore(), snapshot().',
    keyPhrases: ['renv workflow', 'init conflict', 'redundant calls'],
    explanation: 'Running init() again might re-initialize the project, losing the restore state. Typically you do init() once, restore if needed, then snapshot.'
  },
  {
    id: 98,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The user wants a 75:25 split in a complete randomization, but the following code yields 50:50. Correct it:',
    content: `set.seed(999)
dt[, random_num := runif(.N)]
setorder(dt, random_num)
dt[, treatment := 0]
dt[1:(.N/2), treatment := 1]`,
    correctAnswer: 'Change .N/2 to floor(.N*0.75) for 75% treatment, e.g. dt[1:floor(.N*0.75), treatment := 1].',
    keyPhrases: ['complete randomization', 'allocation ratio', '75% assignment'],
    explanation: 'The line dt[1:(.N/2), treatment := 1] fixes it at 50%. To get 75:25, use floor(.N*0.75).'
  },
  {
    id: 99,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Spot the bug in this code meant to do repeated measures analysis using data reshaping:',
    content: `long_data <- melt(dt, id.vars="id", measure.vars=c("outcome_t1", "outcome_t2"), variable.name="time", value.name="outcome")
mod <- lm(outcome ~ time, data=long_data[id==1])`,
    correctAnswer: 'They restricted the model to id==1 by accident: mod <- lm(outcome ~ time, data=long_data) is needed for the full dataset.',
    keyPhrases: ['data subset error', 'id==1', 'melt to long format'],
    explanation: 'If you only subset by id==1, you fit the model for a single participant. Possibly they intended to remove that subset or use a different condition.'
  },
  {
    id: 100,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'This code tries to implement a "clustered standard errors" approach but is incomplete. Provide the needed fix:',
    content: `mod <- lm(y ~ x + cluster, data=dt)
summary(mod) # expecting clustered SE`,
    correctAnswer: 'Including "cluster" as a variable in the formula does not do cluster-robust SE automatically. We need a robust method like coeftest(mod, vcov=vcovCL(mod, cluster=dt$cluster)) or something similar from a robust package.',
    keyPhrases: ['cluster robust', 'lm formula vs. robust SE', 'vcovCL'],
    explanation: 'Merely controlling for cluster as a factor is different from using cluster-robust standard errors. We must apply a function that adjusts SEs for clustering.'
  },
  {
    id: 101,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Fix the incorrect approach to matching in the snippet below, which sorts by ID rather than a distance measure:',
    content: `dt <- dt[order(id)]
for (i in seq(1, nrow(dt), by=2)) {
  # pair i, i+1
  ...
}`,
    correctAnswer: 'We should compute a distance measure on relevant covariates, then match or pair based on minimal distances rather than arbitrary ID order.',
    keyPhrases: ['matching pairs', 'distance measure', 'logic error'],
    explanation: 'Sorting by id does not ensure similarity. Instead, you must define a distance metric on covariates (e.g. Mahalanobis distance) and pair the closest units.'
  },
  {
    id: 102,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The code is meant to implement an F-test for joint significance after randomization, but it incorrectly uses a logistic regression. Correct it:',
    content: `model <- glm(treatment ~ x1 + x2, data=dt, family=binomial)
anova(model, test="F")`,
    correctAnswer: 'We should use a linear model (lm or similar) for an F-test. For checking balance, do: model <- lm(treatment ~ x1 + x2, data=dt); anova(model, test="F").',
    keyPhrases: ['joint significance', 'anova', 'logistic vs. linear regression'],
    explanation: 'For an omnibus test of continuous or binary covariates as predictors of treatment, a standard linear model with an F-test is typical for balance checks.'
  },
  {
    id: 103,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Identify why the code below does not yield reproducible results even though it sets a seed, and fix it:',
    content: `for (i in 1:3) {
  set.seed(123)
  rand_num <- runif(1)
  print(rand_num)
}`,
    correctAnswer: 'The seed is reset inside the loop each time. Move set.seed(123) before the loop, so random draws within the loop differ across iterations.',
    keyPhrases: ['seed reset each iteration', 'reproducible random draws', 'move seed outside loop'],
    explanation: 'Calling set.seed(123) repeatedly inside a loop always produces the same random draw. You must set the seed once outside the loop.'
  },
  {
    id: 104,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The code tries to store partial results of a power simulation but overwrites them each iteration. Show how to fix it:',
    content: `results <- data.frame(iter=integer(), p_val=numeric())
for (i in 1:1000) {
  p_val <- t.test(...)$p.value
  results <- data.frame(iter=i, p_val=p_val)
}`,
    correctAnswer: 'Use rbind or store in a pre-allocated structure. For example:\n```\nresults <- data.frame(iter=integer(), p_val=numeric())\nfor (i in 1:1000) {\n  p_val <- t.test(...)$p.value\n  results <- rbind(results, data.frame(iter=i, p_val=p_val))\n}\n```',
    keyPhrases: ['overwrite data frame', 'rbind', 'append results'],
    explanation: 'Each iteration recreated results from scratch. We must rbind or otherwise append to keep all iterations in the final table.'
  },
  {
    id: 105,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Fix this code that attempts to do a randomization test but uses the same random assignment each time due to a misplaced seed:',
    content: `set.seed(123)
for (b in 1:999) {
  dt[, shuffle := sample(treatment)]
  # ...
}`,
    correctAnswer: 'We should not set the seed inside the loop. If the seed is set once outside, each sample call in the loop will differ. If we must replicate exactly, set the seed outside the loop or remove it entirely from inside.',
    keyPhrases: ['permutation test', 'sample repeated', 'seed placement'],
    explanation: 'Putting set.seed(123) inside the loop replicates the same random draw each iteration. We typically set it once before the loop or omit it in the loop for varied permutations.'
  },
  {
    id: 106,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'There is a bug in the code for simulating cluster-randomized data. Spot it:',
    content: `n_clusters <- 10
cluster_size <- 50
for (cl in 1:n_clusters) {
  dt <- data.frame(id=1:cluster_size, cluster=cl, y=rnorm(cluster_size))
}
`,
    correctAnswer: 'They overwrite "dt" in each iteration. They need to combine (rbind) across clusters or initialize dt before the loop.',
    keyPhrases: ['data overwrite', 'simulate cluster data', 'rbind each cluster'],
    explanation: 'Inside the loop, dt is redefined each time. Instead, do something like: if(cl==1) dt<-... else dt<-rbind(dt, ...).'
  },
  {
    id: 107,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'In the code below, the "analysis.qmd" does not update the results after changes in the dataset. Correct the pipeline mistake:',
    content: `# analysis.qmd
# Some code reading "clean_data.csv" from a prior script
# But user never regenerates that prior script or overwrites "clean_data.csv"
`,
    correctAnswer: 'They must re-run the data cleaning script or re-generate "clean_data.csv" before rendering "analysis.qmd". The pipeline must ensure updated input files.',
    keyPhrases: ['data pipeline', 'analysis depends on prior steps', 'out-of-date input'],
    explanation: 'If "analysis.qmd" depends on "clean_data.csv," that file must be recreated or updated when the underlying cleaning script changes.'
  },
  {
    id: 108,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Correct the misapplication of the cluster random assignment below, which places all clusters into treatment=1:',
    content: `for (cl in unique(dt$cluster)) {
  dt[cluster==cl, treat := 1]
}`,
    correctAnswer: 'Use a random assignment for each cluster. Example: if(runif(1)<0.5) treat=1 else treat=0, or a Bernoulli or complete approach at the cluster level.',
    keyPhrases: ['cluster randomization', 'logical error', 'all treat=1'],
    explanation: 'They set treat=1 unconditionally for each cluster. Instead, apply a random draw for each cluster or systematically half of them.'
  },
  {
    id: 109,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'Spot the error in the function that tries to measure MDE but incorrectly sets alpha=1 - beta. Fix it:',
    content: `calc_mde <- function(sd, alpha, power) {
  # Mistakenly using alpha = 1 - power
  z_alpha <- qnorm(alpha)
  z_power <- qnorm(1 - alpha)
  mde <- (z_alpha + z_power) * sd
  return(mde)
}`,
    correctAnswer: 'They conflated alpha and beta. We should use alpha for significance, beta=1-power, e.g. z_alpha=qnorm(1-alpha/2) and z_beta=qnorm(power).',
    keyPhrases: ['MDE calculation', 'alpha vs. beta confusion', 'qnorm usage'],
    explanation: 'Alpha (significance) is distinct from beta (Type II error) = 1 - power. The correct formula typically uses z_{1-alpha/2} and z_{power}.'
  },
  {
    id: 110,
    type: QUESTION_TYPES.CODE_CORRECTION,
    question: 'The user wants to do a GitHub commit from RStudio for reproducible research, but the commit message never records. Identify the step they missed:',
    content: `# RStudio's Git pane: user stages files, but the commit message is empty
# Press "Commit" -> no commit message is included
`,
    correctAnswer: 'They need to enter a commit message before pressing "Commit". Without a message, the commit is aborted.',
    keyPhrases: ['version control', 'commit message', 'git usage'],
    explanation: 'Git requires a commit message. In RStudio’s Git pane, you must type a descriptive message in the commit message box or the commit will fail.'
  },
  {
    id: 111,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique the design: A researcher wants to test the effect of a new nutritional program. They choose one village with the program and compare outcomes to a neighboring village without it.',
    content: 'No formal randomization was done; the chosen village for the program had better baseline health infrastructure. The researcher concludes the program caused better nutritional outcomes.',
    correctAnswer: 'Lack of randomization and likely confounding: the chosen village’s pre-existing advantages might drive the observed outcome difference, not the program itself.',
    keyPhrases: ['no randomization', 'confounding', 'village differences'],
    explanation: 'Since only one village is in each condition, pre-existing differences cannot be distinguished from treatment effects.'
  },
  {
    id: 112,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A study on a new therapy for anxiety used a volunteer sample from a clinic: 40 signed up for the therapy, while another 40 patients from a different clinic served as controls. Critique the design.',
    content: 'Researchers claim randomization, but they effectively used volunteers vs. non-volunteers from distinct locations. They find a big difference in anxiety scores after 8 weeks.',
    correctAnswer: 'This is not genuine random assignment. Selection bias and clinic-level differences may confound the comparison.',
    keyPhrases: ['volunteer bias', 'non-random assignment', 'selection bias'],
    explanation: 'Different clinics and self-selection produce systematic differences that could explain outcomes, undermining causal claims.'
  },
  {
    id: 113,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Researchers performed a power calculation only after collecting the data to justify their sample size. They found the study was "sufficiently powered" but only reported post-hoc power. Critique this approach.',
    content: 'They argue the effect size was large, so their post-hoc power is 85%.',
    correctAnswer: 'Post-hoc power analyses are often misleading; it’s more appropriate to plan power a priori. Post-hoc power can simply reflect the observed effect size rather than actual design power.',
    keyPhrases: ['post-hoc power', 'misleading', 'planning vs. justification'],
    explanation: 'Power calculations should guide design decisions, not be used retroactively to rationalize an unplanned sample size.'
  },
  {
    id: 114,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A cross-sectional design is used to evaluate a policy that was implemented 2 years ago. The researcher compares a group that "adopted the policy" with those that did not, attributing differences to the policy. Critique.',
    content: 'No baseline data exist, and the groups differ on numerous pre-policy characteristics. The researcher claims random variation in who adopted the policy.',
    correctAnswer: 'Without baseline data or randomization, we cannot separate pre-policy differences from the policy effect. The design likely suffers from selection bias.',
    keyPhrases: ['cross-sectional', 'no baseline', 'selection bias'],
    explanation: 'Pre-existing differences might fully explain the group outcome differences, invalidating the causal claim.'
  },
  {
    id: 115,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Researchers randomize individuals to an intervention but then exclude those who do not comply from the "treatment" group analysis. Critique.',
    content: 'They claim to have an unbiased estimate among compliers, ignoring the randomization assignment for the noncompliers.',
    correctAnswer: 'This breaks the intent-to-treat principle and can introduce selection bias. Noncompliers may systematically differ from compliers.',
    keyPhrases: ['compliance', 'attrition', 'intent-to-treat'],
    explanation: 'When participants are analyzed only if they comply, the original random assignment is compromised, threatening internal validity.'
  },
  {
    id: 116,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'An RCT with 5 arms is planned, but researchers do no adjustments for multiple comparisons. They interpret p<0.05 in any arm as evidence of an effect. Critique.',
    content: 'They find at least one arm is significant at 5% alpha in every replication, concluding they have strong evidence of benefit.',
    correctAnswer: 'They risk inflated Type I error across multiple arms. They should adjust for multiple hypothesis testing or use a family-wise error control method.',
    keyPhrases: ['multiple arms', 'multiple testing', 'inflated alpha'],
    explanation: 'Without correction, the chance of a false positive in at least one arm is higher than the nominal 5%.'
  },
  {
    id: 117,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A researcher includes post-treatment variables as covariates to "improve precision." Critique the approach.',
    content: 'They say controlling for everything observed after randomization is beneficial. However, the adjusted effect changes drastically.',
    correctAnswer: 'Including post-treatment variables can induce collider bias or partial mediation, undermining causal interpretation and possibly biasing the estimate.',
    keyPhrases: ['post-treatment covariates', 'collider bias', 'mediation'],
    explanation: 'Covariates measured after treatment may be affected by the treatment, introducing bias if used as controls.'
  },
  {
    id: 118,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'In a cluster trial, investigators randomize 2 large hospitals to the new protocol and 1 small hospital to control, concluding the protocol is successful. Critique the design.',
    content: 'No standard approach to ensure balanced cluster characteristics, leading to unrepresentative clusters and possible confounding by hospital size.',
    correctAnswer: 'With only 3 clusters, randomization is questionable and the design is prone to severe imbalance. The small sample of clusters undermines internal validity.',
    keyPhrases: ['cluster trial', 'small number of clusters', 'imbalance'],
    explanation: 'Having so few clusters is insufficient to reliably attribute differences to the new protocol rather than hospital-specific effects or sizes.'
  },
  {
    id: 119,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A re-randomization approach is used, but the researchers never disclose which balance criteria or how many attempts were made. Critique the transparency.',
    content: 'They only say "We repeated randomization until it looked good," providing no details.',
    correctAnswer: 'Lack of transparency in re-randomization criteria prevents proper understanding or replication. It can lead to biased or cherry-picked randomizations.',
    keyPhrases: ['re-randomization approach', 'transparency', 'replicability'],
    explanation: 'Without specifying threshold or optimization metrics, readers cannot judge the final allocation’s representativeness.'
  },
  {
    id: 120,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'After randomization, the researcher observes imbalance on certain baseline covariates and reassigns participants manually to "fix" the imbalance. Critique.',
    content: 'They shift some participants from control to treatment, ignoring the initial random draw.',
    correctAnswer: 'Manual reallocation post-randomization undermines random assignment, introducing bias. The integrity of randomization is lost.',
    keyPhrases: ['post-hoc reallocation', 'randomization integrity', 'bias'],
    explanation: 'Any changes after seeing covariate distributions compromise the original random procedure, thus invalidating the experiment’s unbiased nature.'
  },
  {
    id: 121,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A pilot study uses only 5 subjects in each arm, concluding the new device is "significantly better" with a p-value of 0.04. Critique the reliability of this inference.',
    content: 'They claim it demonstrates efficacy. However, the sample is extremely small, with wide variance and unrepresentative participants.',
    correctAnswer: 'A small sample of 10 total individuals yields large uncertainty. The finding may be unstable or a fluke. External validity is also questionable.',
    keyPhrases: ['small sample', 'pilot study', 'overinterpretation', 'statistical power'],
    explanation: 'Though p=0.04, with n=10 the results are not robust, and statistical power to detect typical effects is low. Type I or Type II errors are more likely.'
  },
  {
    id: 122,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Critique this "optimistic" power calculation: The researcher bases the effect size on the largest previously observed effect in the literature, ignoring other estimates.',
    content: 'They set the MDE to that historically largest effect, concluding a small sample suffices.',
    correctAnswer: 'Basing design solely on the largest prior effect is unrealistic and may underpower the study if the true effect is smaller.',
    keyPhrases: ['power misestimation', 'unrealistic effect size', 'underpower risk'],
    explanation: 'Overestimating the effect inflates power calculations, leading to inadequate sample sizes and potentially negative or inconclusive results.'
  },
  {
    id: 123,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A study lumps partially treated individuals (non-compliers) into the control group. Critique the potential consequences for the estimated effect.',
    content: 'They claim it prevents "diluting" the effect measure, but do not mention how those partial compliers differ from full compliers or pure controls.',
    correctAnswer: 'Misclassification of partially treated individuals in control can bias the effect estimate, likely overstating the difference by excluding partial compliance from the treatment group.',
    keyPhrases: ['non-compliance', 'misclassification', 'intent-to-treat violation'],
    explanation: 'Individuals assigned to treatment but not fully compliant differ from pure controls, inflating or deflating effect estimates if incorrectly grouped.'
  },
  {
    id: 124,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'In a factorial design with two interventions (A and B), the researchers only compare (A,B) combined vs. no treatment, ignoring the single-intervention groups. Critique.',
    content: 'They conclude synergy but never look at A-only or B-only arms to test main or interaction effects.',
    correctAnswer: 'They fail to use the factorial structure properly. Without analyzing A-only and B-only, synergy or individual effects cannot be reliably assessed.',
    keyPhrases: ['factorial design misuse', 'interaction', 'no single arms used'],
    explanation: 'A factorial design’s advantage is testing each factor individually plus their interaction. Ignoring single arms forfeits that design benefit.'
  },
  {
    id: 125,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Researchers in a cluster trial do not measure or account for intracluster correlation in their analysis. Critique the impact on results.',
    content: 'They proceed as if each participant is independent, ignoring that people within the same cluster share similarities.',
    correctAnswer: 'Ignoring ICC underestimates standard errors, inflating significance. This can lead to false positives and overconfident results.',
    keyPhrases: ['cluster correlation', 'design effect', 'false positives'],
    explanation: 'Failing to account for within-cluster correlation is a critical flaw; standard errors must be adjusted or the analysis is invalid.'
  },
  {
    id: 126,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'In an adaptive randomization design, the researcher updates assignment probabilities but never discloses the adaptation rule. Critique.',
    content: 'They claim more patients got the better treatment, but there is no transparency about the threshold or data used to update probabilities.',
    correctAnswer: 'Lack of clarity on the adaptation rule undermines replicability and invites suspicion of ad hoc or biased updates.',
    keyPhrases: ['adaptive randomization', 'non-transparency', 'replicability'],
    explanation: 'Any adaptive design must specify how probabilities are adjusted over time to ensure validity and interpretability.'
  },
  {
    id: 127,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A "within-subject design" for a new rehabilitation device does not allow enough washout time between device use and control. Critique.',
    content: 'Subjects remain physically influenced by the device in the control phase, confounding carryover effects with the no-device condition.',
    correctAnswer: 'Carryover effects are likely. Without a washout period, the control condition is contaminated by residual treatment effect.',
    keyPhrases: ['within-subject', 'carryover effect', 'washout period'],
    explanation: 'In repeated-measures or crossover designs, a proper washout ensures that the second condition is not influenced by the first.'
  },
  {
    id: 128,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A student uses "before vs. after the experiment" with no control group. They observe improvement and claim the program was effective. Critique.',
    content: 'No comparison group or control is present. The improvement might reflect regression to the mean or external factors.',
    correctAnswer: 'A pre-post design alone cannot isolate treatment effects from time trends or regression to the mean. A control group is critical.',
    keyPhrases: ['no control group', 'time trends', 'regression to the mean'],
    explanation: 'Concluding causality is invalid without an appropriate control or difference-in-differences approach.'
  },
  {
    id: 129,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'A cluster RCT excludes two entire clusters from the analysis post-hoc because the intervention was "not fully implemented" there. Critique the approach.',
    content: 'They do not mention how these clusters might differ from those that implemented fully. They assume minimal impact on internal validity.',
    correctAnswer: 'Excluding non-implementing clusters can bias results if these clusters differ systematically, violating random assignment. Proper intent-to-treat or alternative methods are needed.',
    keyPhrases: ['exclusion of clusters', 'differential implementation', 'violating random assignment'],
    explanation: 'Removing clusters after randomization can distort the composition of the treatment or control groups, undermining causal inference.'
  },
  {
    id: 130,
    type: QUESTION_TYPES.RESEARCH_DESIGN_CRITIQUE,
    question: 'Researchers end the study early upon seeing a strong effect in the interim analysis, with no formal stopping rule. Critique the practice.',
    content: 'They argue resources are saved, but they had no prespecified rule, potentially inflating Type I error due to optional stopping.',
    correctAnswer: 'Stopping early without a formal boundary can lead to inflated false-positive rates and overestimates of the effect size.',
    keyPhrases: ['optional stopping', 'inflated type I error', 'interim analysis'],
    explanation: 'A proper interim analysis requires predefined stopping rules or alpha spending functions. Otherwise, it can artificially favor a significant early result.'

  },
  {
    id: 131,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Examine the following study:\n"An NGO organizes an adolescent empowerment program in 3 schools that volunteer. They compare the program’s effect on test scores with 3 non-volunteer schools in the region." Identify issues.',
    content: 'The NGO claims it’s an experiment. Yet volunteering schools may differ in motivation, resources, or parental support, affecting test scores.',
    correctAnswer: 'This design has self-selection by schools. Differences in volunteer vs. non-volunteer schools might explain outcome gaps, not the program itself.',
    keyPhrases: ['self-selection', 'volunteer bias', 'no random assignment'],
    explanation: 'Without random assignment or a way to account for preexisting differences, the results likely reflect selection rather than program impact.'
  },
  {
    id: 132,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"Investigators add a psychological counseling module for postpartum mothers at one hospital and use a neighboring hospital for control. They do not measure baseline depression or differences in staff." Critique the approach.',
    content: 'They measure postpartum depression outcomes after 6 weeks and attribute all differences to the counseling module.',
    correctAnswer: 'No baseline measure of depression and no random assignment across hospitals. Staff and institutional differences or baseline mental health status could confound the effect.',
    keyPhrases: ['baseline data missing', 'hospital-level confounding', 'quasi-experimental'],
    explanation: 'Without baseline or randomization, attributing outcome differences to the counseling module is speculative.'
  },
  {
    id: 133,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study states:\n"Participants were assigned to the new diet or standard diet by flipping a coin, but participants could switch diets if they did not like their initial assignment. After 3 months, they found a large difference." Critique.',
    content: 'Switching indicates incomplete compliance. The final group difference might reflect participant preference rather than random assignment effect.',
    correctAnswer: 'Non-compliance and self-selection post-randomization threaten internal validity. The actual assignment is not purely random if participants can switch.',
    keyPhrases: ['compliance issue', 'post-randomization choice', 'selection bias'],
    explanation: 'Allowing participants to opt out of their assigned group can reintroduce confounding that randomization was designed to eliminate.'
  },
  {
    id: 134,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"A matched-pair design to evaluate a vaccination drive pairs children by age, but the final analysis lumps all pairs together as a single group measure." Critique the analysis choice.',
    content: 'They do not leverage the paired structure and do not adjust for pairs in any regression or difference measure.',
    correctAnswer: 'Ignoring the matched structure forfeits the advantage of matching. The analysis should reflect the pairs, possibly using a paired analysis or controlling for pair fixed effects.',
    keyPhrases: ['matched-pair design', 'analysis mismatch', 'paired approach'],
    explanation: 'When matched pairs are formed, analyzing them as if unmatched can lose the variance reduction advantage.'
  },
  {
    id: 135,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"The team measures compliance repeatedly and modifies the intervention for low-compliance subjects, but still lumps them with the "high compliance" group in the final analysis." Critique the design and analysis synergy.',
    content: 'This adaptive approach modifies the intervention mid-study, yet the final results treat all participants as having the same intervention dosage.',
    correctAnswer: 'Failing to differentiate adapted interventions from the original protocol conflates different treatments. The design is partially adaptive but the analysis lumps groups, obscuring real effects.',
    keyPhrases: ['adaptive design', 'compliance changes', 'inconsistent analysis'],
    explanation: 'The final analysis should consider that some participants received a different or intensified treatment, not the same original regimen.'
  },
  {
    id: 136,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"Researchers randomly select 50 individuals from each of 3 towns for a community health intervention. They only measure outcomes in the intervention group, concluding the program is effective." Critique the approach.',
    content: 'There is no control group measurement. They see pre vs. post changes, but have no parallel control data.',
    correctAnswer: 'No actual control group data prevents any causal inference. It is effectively a single-arm pre-post comparison.',
    keyPhrases: ['lack of control group', 'pre-post only', 'sample selection'],
    explanation: 'To attribute changes to the intervention, a comparable control group or difference-in-differences is necessary.'
  },
  {
    id: 137,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"In a multi-site RCT, the largest site contributed 80% of participants. They didn’t do site-level stratification or site fixed effects, but report overall p-values." Critique potential site confounding.',
    content: 'One site’s characteristics could dominate the overall effect, overshadowing variability across smaller sites.',
    correctAnswer: 'Without accounting for site differences or balancing across sites, the largest site can drive the results, possibly misrepresenting overall effect.',
    keyPhrases: ['multi-site RCT', 'dominant site', 'site-level stratification'],
    explanation: 'Large site imbalance can confound results if that site is systematically different. Site-level random effects or fixed effects are recommended.'
  },
  {
    id: 138,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study scenario:\n"An RCT randomizes schools to an IT-based reading program. However, half of the treatment schools do not implement it. The final report excludes them from analysis." Identify the flaw.',
    content: 'They only analyze the subset that used the program as "treatment." The rest get discarded, leading to a possibly biased estimate.',
    correctAnswer: 'Excluding partial implementers breaks random assignment and may lead to selection bias in the results. The correct approach is an ITT analysis or an appropriate method for noncompliance.',
    keyPhrases: ['partial implementation', 'selection bias', 'exclusion of clusters'],
    explanation: 'Dropping schools that did not adhere to the intervention changes the composition of the groups post-randomization.'
  },
  {
    id: 139,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study design vignette:\n"Researchers measure only short-term outcomes for a public health intervention known to have delayed effects. They conclude no effect." Critique the timing issue.',
    content: 'They do the final measurement at 1 week post-intervention, even though the effect likely manifests after months.',
    correctAnswer: 'Measuring outcomes too soon can miss real treatment effects that take longer to appear, leading to a false conclusion of no effect.',
    keyPhrases: ['timing mismatch', 'delayed treatment effect', 'follow-up period'],
    explanation: 'Outcome measurement must align with the expected timeline of the intervention’s impact.'
  },
  {
    id: 140,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"In a stepping-wedge design, the sequence of site adoption is not randomized but chosen by administrative convenience. They still assume random assignment in analysis." Critique the mismatch.',
    content: 'They interpret results as if each wave was randomly decided, but wave order was determined by administrative scheduling.',
    correctAnswer: 'Without actual random assignment to waves, confounding could arise from systematically different sites or times of adoption. The stepping-wedge design is compromised.',
    keyPhrases: ['stepping-wedge', 'non-random wave order', 'administrative convenience'],
    explanation: 'Stepping-wedge typically requires random selection of which site transitions at each wave. Non-random wave scheduling invalidates that assumption.'
  },
  {
    id: 141,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"An experiment randomizes individuals to 3 arms. The final analysis lumps two treatment arms together because one arm had lower enrollment. They compare combined to control." Critique.',
    content: 'They lose the distinction between the two different treatments. Any differential effects are not discoverable now.',
    correctAnswer: 'Combining arms obscures differences in the two distinct treatments and may misrepresent the effect size. The design advantage of multiple arms is lost.',
    keyPhrases: ['multiple arms', 'lumping treatments', 'lost subgroup analysis'],
    explanation: 'They sacrifice the original design’s granularity, potentially combining a more effective intervention with a less effective one, skewing results.'
  },
  {
    id: 142,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Scenario:\n"Principal Investigators re-randomized participants multiple times until a baseline F-test for all covariates showed p>0.3, but then they used standard inference ignoring re-randomization." Critique the analysis approach.',
    content: 'The final sample is not purely random anymore. The p-values from standard analyses might not be accurate.',
    correctAnswer: 'Re-randomization changes the randomization distribution, so standard p-values are incorrect unless properly adjusted. They need design-conscious inference methods.',
    keyPhrases: ['re-randomization effect', 'inflation of Type I error', 'analysis mismatch'],
    explanation: 'Standard methods assume a single random draw, not repeated draws conditioned on a balance threshold.'
  },
  {
    id: 143,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study design:\n"They do a one-shot measure of knowledge right after a short training, with no follow-up. They claim improved long-term knowledge." Critique the conclusion.',
    content: 'Lack of any delayed measurement means we have no evidence about knowledge retention over time.',
    correctAnswer: 'Measuring immediately after a training might capture short-term recall but not confirm lasting effects. The conclusion about long-term improvement is unsupported.',
    keyPhrases: ['short-term measurement', 'no follow-up', 'long-term claim'],
    explanation: 'An outcome measured immediately may not reflect persistent changes. A second wave would be needed to assess longevity.'
  },
  {
    id: 144,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"In an RCT for a text-messaging intervention, a third of participants never received the texts due to phone service issues. The analysis lumps them with control." Evaluate the design implications.',
    content: 'They claim near-perfect compliance by removing those with phone issues from the treat group. They do not mention the random assignment of those participants.',
    correctAnswer: 'Reclassifying participants ex post breaks randomization and can produce biased estimates. It is not a true ITT analysis.',
    keyPhrases: ['ex post classification', 'phone service issues', 'bias'],
    explanation: 'Those assigned to treatment but lacking phone service are systematically different. Proper analysis must keep them in the assigned group or use specialized methods for noncompliance.'
  },
  {
    id: 145,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study scenario:\n"The program is introduced system-wide (no control group). They compare outcomes to historical data from the previous year." Provide the main design critique.',
    content: 'This is a before-after design with no concurrent control. Many confounders or trends could have changed over a year.',
    correctAnswer: 'Time trends or external factors could explain differences from last year. Without a parallel control group, causal inference is weak.',
    keyPhrases: ['before-after design', 'no parallel control', 'time trends'],
    explanation: 'Historical controls are vulnerable to changes unrelated to the intervention.'
  },
  {
    id: 146,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"An experiment included extensive baseline data, but the final analysis omits those covariates. Investigators claim randomization ensures no need for them." Critique the choice regarding efficiency.',
    content: 'By ignoring strong baseline predictors, they might have lost power to detect an effect. The effect estimate is still unbiased but possibly less precise.',
    correctAnswer: 'While randomization ensures unbiasedness, including strong predictors can reduce residual variance and improve power. Omitting them loses efficiency.',
    keyPhrases: ['covariate omission', 'precision', 'efficiency'],
    explanation: 'Randomization yields unbiasedness, but controlling for important covariates can significantly enhance statistical power.'
  },
  {
    id: 147,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study design:\n"The investigator decides to provide the intervention to all pregnant women who are at high risk, using a risk algorithm. Then they call it random because they do not strictly pick and choose." Critique the claim of randomization.',
    content: 'The assignment is algorithm-based on risk, not random. High-risk women systematically differ from others, confounding the effect.',
    correctAnswer: 'This is not random assignment. The selection is determined by a risk algorithm, leading to confounded comparisons with those not receiving the intervention.',
    keyPhrases: ['risk-based assignment', 'no randomization', 'confounding'],
    explanation: 'If assignment is correlated with risk, the effect estimate conflates risk differences with treatment impacts.'
  },
  {
    id: 148,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"Researchers cluster-randomize 10 clinics. During the study, 2 clinics merge. The final analysis keeps them as separate clusters anyway." Evaluate the potential issue.',
    content: 'If the clinics physically merged staff and patients, they are no longer separate clusters. This might cause contamination or double-counting.',
    correctAnswer: 'Merging clinics can lead to contamination and potentially misrepresents the cluster structure. The analysis should account for the merged entity.',
    keyPhrases: ['cluster merging', 'contamination', 'analysis mismatch'],
    explanation: 'Treating them as distinct clusters is incorrect if they effectively become one site with shared staff/patients.'
  },
  {
    id: 149,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Study design:\n"An online RCT recruits participants but drops those who fail to click a confirmation link. They remain unaccounted for in the final dataset." Critique the approach.',
    content: 'They may have systematically excluded certain users. The final sample might not represent the original random assignment.',
    correctAnswer: 'Excluding participants who did not confirm could cause attrition bias if those individuals differ systematically from confirmers.',
    keyPhrases: ['online RCT', 'confirmation link', 'attrition bias'],
    explanation: 'Participants who do not confirm might have unique characteristics. The analysis ignoring them can lead to bias in the effect estimate.'
  },
  {
    id: 150,
    type: QUESTION_TYPES.STUDY_VIGNETTE_CRITIQUE,
    question: 'Vignette:\n"In an ongoing 2-year field experiment, the investigators release preliminary results at 6 months showing a borderline significant effect. They do not mention how that might alter behavior mid-study." Critique.',
    content: 'Publicizing borderline significance might change participant or staff behavior, leading to contamination or changes in compliance.',
    correctAnswer: 'Revealing interim findings can compromise the ongoing randomization environment. Participants might alter behavior if they learn about partial results, threatening internal validity.',
    keyPhrases: ['interim findings', 'behavior change', 'contamination'],
    explanation: 'Publicly releasing partial results can influence both participants and providers, undermining the original random assignment assumptions.'

  },

  // =============== 20 COUNTERFACTUAL_REASONING QUESTIONS (IDs 151 - 170) ===============
  {
    id: 151,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Explain the missing counterfactual in a scenario where a nurse chooses which patients get a new medication based on their perceived severity.',
    content: 'We observe patients who received the medication had better outcomes, but the nurse’s selection was not random.',
    correctAnswer: 'We cannot observe how severe patients would have fared under control or how less severe patients would have responded to the medication. The selection confounds inference.',
    keyPhrases: ['nurse selection', 'confounding', 'counterfactual outcomes'],
    explanation: 'Because the nurse chooses who gets medication, those chosen might differ systematically, so we cannot know what their outcomes would be had they not been chosen, and vice versa.'
  },
  {
    id: 152,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'A city invests more in social services in neighborhoods with historically high crime rates. Residents show improved outcomes. Provide the key counterfactual question.',
    content: 'Would these same neighborhoods have improved without the additional investment? Or how would low-crime neighborhoods look with that investment?',
    correctAnswer: 'We need to know how the high-crime neighborhoods would have fared if they had not received extra funding, or how a low-crime area would do with the extra funding. This is the missing counterfactual.',
    keyPhrases: ['extra funding', 'crime rates', 'counterfactual question'],
    explanation: 'Selection based on high crime might confound the interpretation; we do not see the alternative scenario if those neighborhoods had normal funding.'
  },
  {
    id: 153,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a matched-pair design, each pair has a treated and control unit. Explain the counterfactual difference we approximate within each pair.',
    content: 'We assume each matched pair is almost identical on key covariates, so the difference in outcomes approximates the treatment effect for that type of unit.',
    correctAnswer: 'The missing counterfactual is what the treated unit’s outcome would be if it were in the control condition, approximated by the matched control within that pair.',
    keyPhrases: ['matched pair', 'counterfactual difference', 'approximation'],
    explanation: 'Matching tries to ensure pairs differ only by treatment, so one unit’s outcome stands in for the other’s missing potential outcome.'
  },
  {
    id: 154,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Counterfactual reasoning: "We observe that older participants use the new health app more and also have better health outcomes." What is the unobserved scenario?',
    content: 'We do not see how older participants would do if they did not use the app, nor how younger participants would do if they used it at the same rate.',
    correctAnswer: 'Missing is older participants’ outcomes in a world where they are not using the app, and younger participants’ outcomes if they did. The difference might be due to age, not the app itself.',
    keyPhrases: ['age confounding', 'app usage', 'counterfactual scenario'],
    explanation: 'If app usage is correlated with age, we can’t separate the effect of the app from the effect of age without random assignment or controlling for age.'
  },
  {
    id: 155,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'A cluster trial assigns new training to half the clinics. Some clinics close mid-study. Evaluate the missing counterfactual for those closed clinics.',
    content: 'We do not see how outcomes would have evolved if those clinics had stayed open. The closure might correlate with treatment or outcomes.',
    correctAnswer: 'The missing scenario is how the closed clinics would have performed had they not closed. We only observe partial outcomes, so final data for them is missing.',
    keyPhrases: ['cluster closure', 'attrition', 'counterfactual performance'],
    explanation: 'When clinics drop out, we lose their potential outcomes in the final period, which we cannot observe.'
  },
  {
    id: 156,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Why is the concept of potential outcomes central to understanding the effect of "re-running" an experiment under different random draws?',
    content: 'Because potential outcomes define what would happen under each assignment. If random draws differ, we see different subsets in each arm, but can’t see both outcomes for the same unit simultaneously.',
    correctAnswer: 'We only observe realized outcomes for one random draw. Potential outcomes formalize the idea of how each unit might respond in all possible assignments, which remain partially unobserved.',
    keyPhrases: ['random draws', 'unobserved potential outcome', 're-running experiment'],
    explanation: 'Causal inference is about comparing the same unit’s hypothetical outcomes under different treatments, but we only get one.'
  },
  {
    id: 157,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a super-population framework, an RCT sample is drawn from a larger population. Identify the main "unseen" scenario from a counterfactual perspective regarding sampling.',
    content: 'We do not observe how a different sample from the same population would have responded. Each sample is just one realization of many possible draws.',
    correctAnswer: 'The missing scenario is how other samples from the same distribution would behave under the same treatment assignment. Each sample is a single draw from the super-population.',
    keyPhrases: ['super-population', 'sampling variability', 'counterfactual sample'],
    explanation: 'Besides treatment assignment, we also have sampling randomness in the super-population approach.'
  },
  {
    id: 158,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'A study finds that reading skill improved more in the group that received extra tutoring. Which exact counterfactual is being approximated by this difference?',
    content: 'It approximates how the tutored students would have performed had they not received tutoring, as proxied by the control group’s reading skill outcome.',
    correctAnswer: 'We interpret the control group’s outcome as the missing outcome for the tutored students under no tutoring.',
    keyPhrases: ['reading skill', 'tutoring', 'control group stands in for potential outcome'],
    explanation: 'Under random assignment, the control group is the best available stand-in for the missing “untreated” outcome of those who were treated.'
  },
  {
    id: 159,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a re-randomization design, how does the concept of counterfactual outcomes still apply after discarding many random assignments?',
    content: 'We condition on a certain "balanced" assignment. The potential outcomes under other possible assignments remain unobserved. We only realize one balanced assignment eventually.',
    correctAnswer: 'Even though we discard unbalanced assignments, each unit still has potential outcomes under those alternate random allocations that remain unobserved once we pick the final assignment.',
    keyPhrases: ['re-randomization', 'discard unbalanced draws', 'remaining potential outcomes'],
    explanation: 'Counterfactual reasoning persists because we only see each unit’s outcome under the final assignment. The outcomes for other assignments are never realized.'
  },
  {
    id: 160,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Why do we say that in cluster randomization, we never observe the counterfactual of "the same cluster receiving the opposite treatment"?',
    content: 'Each cluster either gets the treatment or not. We don’t see how that exact same cluster’s outcome would differ had they been assigned differently.',
    correctAnswer: 'The same cluster under control is an unobserved state when assigned to treatment, and vice versa. We see only one of those potential outcomes for each cluster.',
    keyPhrases: ['cluster-level assignment', 'one potential outcome per cluster', 'unobserved cluster state'],
    explanation: 'We have no direct observation of how the exact same cluster population would respond under the other assignment, which is the fundamental missing data problem.'
  },
  {
    id: 161,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a difference-in-differences approach, which counterfactual is posited for the treatment group’s outcome in the post period?',
    content: 'We assume it would have followed the same time trend as the control group if not for the treatment.',
    correctAnswer: 'That absent the intervention, the change in outcomes for the treatment group would mirror the control group’s change over time.',
    keyPhrases: ['DiD', 'parallel trends assumption', 'time trend counterfactual'],
    explanation: 'DiD rests on the assumption that in the absence of treatment, both groups would have experienced parallel changes in outcomes.'
  },
  {
    id: 162,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'When using repeated measures on the same individuals, how do the potential outcomes concept apply across time points for each person?',
    content: 'Each person has potential outcomes at each time under treatment or control, but they can only have one realized trajectory depending on assignment and time.',
    correctAnswer: 'For each time point, we can imagine a potential outcome under treatment or control. We only observe a single path in practice, not the parallel universe where they get the alternate assignment at each time.',
    keyPhrases: ['repeated measures', 'longitudinal potential outcomes', 'single realized path'],
    explanation: 'The repeated-measures design still sees only one outcome sequence for each participant, not the alternative sequences.'
  },
  {
    id: 163,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a 2×2 factorial design with interventions A and B, name one set of missing counterfactual outcomes for a participant assigned to both A and B.',
    content: 'We do not observe how that same participant would do under only A, only B, or neither A nor B. Those are the unobserved potential outcomes for that individual.',
    correctAnswer: 'If the participant actually receives (A=1,B=1), we never see their outcomes under (A=0,B=1), (A=1,B=0), or (A=0,B=0).',
    keyPhrases: ['factorial design', 'multiple treatments', 'unobserved arms'],
    explanation: 'Each participant is only assigned to one combination. The other combinations remain potential but unobserved.'
  },
  {
    id: 164,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Explain the missing counterfactual if all participants eventually receive the intervention in a randomized phase-in design, focusing on early vs. late adopters.',
    content: 'We do not see how the late adopters would have fared if they had never gotten the intervention, or how the early adopters would do if delayed.',
    correctAnswer: 'Everyone ultimately receives treatment, so the scenario of not receiving it (or receiving it earlier) is unobserved for each participant. This complicates a pure control comparison.',
    keyPhrases: ['phase-in design', 'everyone eventually treated', 'counterfactual timing'],
    explanation: 'Phase-in ensures no persistent control group for comparison post full adoption, leaving certain potential outcomes unobserved.'
  },
  {
    id: 165,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'A dose-response design has participants assigned to different dosages. For a participant on the highest dose, which potential outcome remains unseen?',
    content: 'Their outcome on a lower dose or zero dose is not observed, so we cannot directly measure how they would have responded to less medication.',
    correctAnswer: 'We never see how that same participant would respond to, e.g., a moderate or no dose. We only observe the highest dose outcome for them.',
    keyPhrases: ['dose-response', 'potential outcomes', 'unobserved lower dose'],
    explanation: 'Each participant only receives one dose, so we cannot observe how the same participant’s health changes under different dose levels.'
  },
  {
    id: 166,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a scenario where the new intervention replaces an old one, the study claims "the old intervention is no longer feasible, so we cannot have a control group." Discuss the implied missing counterfactual.',
    content: 'We never see how participants would fare under the old intervention concurrently. We only know how people did historically under the old approach.',
    correctAnswer: 'The missing scenario is how these same participants would do with the old intervention at the same time. Historical data may not suffice, as conditions change.',
    keyPhrases: ['replacement intervention', 'no concurrent control', 'historical comparison'],
    explanation: 'Because the old approach is phased out, a direct contemporary comparison is missing, leaving the current participants’ potential outcomes under old care unseen.'
  },
  {
    id: 167,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Explain the missing counterfactual for a participant who refused an assigned treatment but stayed in the study as "control."',
    content: 'We do not see how they would have turned out had they actually taken the assigned treatment, and that might differ from typical control participants.',
    correctAnswer: 'Their outcome under genuine treatment is never observed, so we cannot fully interpret their control outcome as if they were originally assigned to control.',
    keyPhrases: ['refusal', 'non-compliance', 'counterfactual assignment'],
    explanation: 'Non-compliers were assigned to treatment but refused, so their actual outcome under the assigned treatment remains unknown.'
  },
  {
    id: 168,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'Counterfactual reasoning: In an observational study where half the sample self-selects into therapy, the main missing piece is?',
    content: 'How the therapy group would have done had they not self-selected therapy, and how the non-therapy group would do if they had selected it.',
    correctAnswer: 'We never see the scenario "therapy group with no therapy" or "control group with therapy," which are necessary to isolate the treatment’s causal effect.',
    keyPhrases: ['observational study', 'self-selection', 'unobserved group scenario'],
    explanation: 'Self-selection means each group might differ systematically. We do not see the same individuals in the opposite assignment.'
  },
  {
    id: 169,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'In a re-randomization approach that discards unbalanced draws, consider a subject who always ends up in the same group across feasible draws. Which counterfactual is missing for them?',
    content: 'We do not observe their outcome in the group that they never appear in due to repeated randomization discarding certain draws.',
    correctAnswer: 'The subject might always appear in treatment across the acceptable random seeds, so we never see their "control" outcome in any final assignment. That remains their missing potential outcome.',
    keyPhrases: ['re-randomization extremes', 'consistent assignment', 'missing potential outcome'],
    explanation: 'Although improbable, a subject could always be assigned to treatment in every re-randomization that passes the balance threshold. So the control potential outcome is never realized.'
  },
  {
    id: 170,
    type: QUESTION_TYPES.COUNTERFACTUAL_REASONING,
    question: 'If a cluster trial has significant interference (spillovers) between clusters, how does this complicate the usual counterfactual argument of "What if cluster X were assigned differently"?',
    content: 'When cluster X changes assignment, it could alter outcomes in cluster Y as well, so the potential outcome for X alone is not well-defined without reassigning Y too.',
    correctAnswer: 'The assumption that only cluster X’s assignment changes is invalid if other clusters’ outcomes respond to X’s treatment. The isolated counterfactual for X is no longer well-defined.',
    keyPhrases: ['spillovers', 'interference', 'counterfactual cluster assignment'],
    explanation: 'SUTVA is violated. The counterfactual for cluster X changing might also necessitate different outcomes for cluster Y, complicating the notion of per-cluster potential outcomes.'

  },

  // =============== 20 STATISTICAL_INTERPRETATION QUESTIONS (IDs 171 - 190) ===============
  {
    id: 171,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Interpret the meaning of a 95% confidence interval for an ATE that runs from -0.2 to 2.5 in a pilot experiment.',
    content: 'It includes negative and positive values, so the data does not rule out a negative effect nor a modest positive effect.',
    correctAnswer: 'We cannot reject that the true effect could be slightly negative or as large as 2.5 units. The interval is wide, implying uncertainty around zero effect or a positive effect.',
    keyPhrases: ['95% CI', 'wide interval', 'interpretation'],
    explanation: 'Since zero is within the interval, the effect is not clearly positive or negative at conventional significance. The wide range reflects small sample or large variance.'
  },
  {
    id: 172,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A cluster-based study reports "ICC = 0.15" for blood pressure outcomes. Interpret this statistic in context.',
    content: 'An ICC of 0.15 suggests that 15% of the variation in blood pressure is attributable to cluster-level factors, meaning outcomes within each cluster are moderately correlated.',
    correctAnswer: 'It indicates a moderate correlation among individuals in the same cluster: 15% of total outcome variance is at the cluster level.',
    keyPhrases: ['ICC', 'interpretation', 'cluster correlation'],
    explanation: 'An ICC of 0.15 means that cluster membership explains 15% of the variation, and the rest is individual-level variation.'
  },
  {
    id: 173,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Researchers run an F-test after randomization to check if treatment can be predicted by baseline covariates. They get an F(5, 194)=1.02, p=0.41. Interpret.',
    content: 'This suggests no strong evidence that the baseline covariates jointly predict treatment status. Randomization likely achieved balance on these covariates.',
    correctAnswer: 'The covariates do not significantly explain variation in treatment assignment, consistent with successful randomization.',
    keyPhrases: ['post-randomization check', 'F-test', 'covariate balance'],
    explanation: 'A non-significant F-test indicates that the baseline covariates collectively do not differ systematically between treatment and control.'
  },
  {
    id: 174,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A re-randomization approach yields a distribution of Mahalanobis distances. The chosen randomization has a distance of 1.2, near the median of all draws. How to interpret?',
    content: 'This suggests the selected assignment is near typical among possible draws in terms of covariate balance, not an extreme "best" or "worst" balance.',
    correctAnswer: 'The final randomization is fairly typical, indicating average-level balance. If one wanted maximum balance, they might pick a smaller distance. But this is not extremely unbalanced either.',
    keyPhrases: ['Mahalanobis distance', 're-randomization distribution', 'median'],
    explanation: 'Mahalanobis distance measures overall imbalance. Being near median implies average balance among all candidate randomizations.'
  },
  {
    id: 175,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'In a matched-pair design, the difference in outcomes within pairs is modeled. The regression slope for "treatment" is 3.2 with a p=0.02. Interpret the coefficient.',
    content: 'On average, the outcome in the treated unit is 3.2 points higher than in the matched control, controlling for pair fixed effects. It is statistically significant at 5%.',
    correctAnswer: 'This indicates that, within each matched pair, treatment is associated with a 3.2-point increase in the outcome on average, and is unlikely due to chance (p=0.02).',
    keyPhrases: ['matched pairs', 'within-pair difference', 'coefficient interpretation'],
    explanation: 'Matching plus regression means the slope shows how much higher the treated side is relative to its match, on average.'
  },
  {
    id: 176,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A cluster-randomized trial with G=20 clusters obtains a p-value of 0.06 for the treatment effect. The 95% CI is [-0.1, 2.1]. How should we interpret near-significance in a cluster design?',
    content: 'It suggests we cannot confidently claim a positive effect at the 5% level. With only 20 clusters, power may be limited; the effect could be slightly negative or up to 2.1 positive.',
    correctAnswer: 'We do not reject the null at alpha=0.05. The wide confidence interval indicates uncertainty, and the borderline p-value might reflect low power with 20 clusters.',
    keyPhrases: ['cluster design', 'near significance', 'interpretation'],
    explanation: 'Small number of clusters often yields wide intervals. The effect could be beneficial or near zero, so the result is inconclusive.'
  },
  {
    id: 177,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Researchers run a logistic regression for a binary outcome, with a treatment coefficient = 0.7 (OR=2.0), p=0.01. Interpret the result.',
    content: 'The odds of a positive outcome are about twice as high in the treatment group than in the control, and this difference is statistically significant.',
    correctAnswer: 'An OR of 2.0 means the estimated odds of success is doubled under treatment, and p=0.01 indicates it’s unlikely to be due to chance at the 5% level.',
    keyPhrases: ['logistic regression', 'odds ratio', 'interpretation'],
    explanation: 'Coefficient=0.7 in log-odds scale corresponds to exp(0.7)=2.0. The significance suggests strong evidence for a difference.'
  },
  {
    id: 178,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'In an adaptive randomization, 70% of participants ended up assigned to the new drug. The final estimate for drug vs. standard effect is 2.5 points (p=0.04). Provide a nuanced interpretation of the p-value, given adaptation.',
    content: 'Adaptive randomization can complicate standard p-values if not accounted for, but p=0.04 still suggests evidence of a positive effect, albeit we must ensure the analysis method is correct for adaptive design.',
    correctAnswer: 'We see nominal significance, but the analysis must incorporate the adaptive randomization procedure. If done properly, p=0.04 indicates the new drug likely differs from standard at 5% alpha.',
    keyPhrases: ['adaptive design', 'p-value interpretation', 'analysis approach'],
    explanation: 'Adaptive designs can require specialized inference. If the method was properly accounted for, p=0.04 means a likely real effect.'
  },
  {
    id: 179,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Suppose a randomization test yields a p-value=0.09 for the difference in means. The classical t-test had p=0.04 for the same data. How to interpret this discrepancy?',
    content: 'A randomization test uses the exact random assignment distribution, while the t-test relies on normal approximations. The difference suggests the normal approximation might be liberal or ignoring design aspects.',
    correctAnswer: 'Because the randomization test is more exact for the actual assignment mechanism, it finds weaker evidence (p=0.09). The t-test’s smaller p-value may be an approximation that’s less accurate.',
    keyPhrases: ['randomization test', 't-test discrepancy', 'exact distribution'],
    explanation: 'If the design or data distribution departs from normal assumptions, the randomization test can yield a more accurate or different inference.'
  },
  {
    id: 180,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A difference-in-differences estimate for an outcome is +3.0 (p=0.15). 95% CI is [-1.2, 7.2]. Interpret in context of policy evaluation.',
    content: 'Although the point estimate suggests a +3.0 improvement, it is not statistically distinguishable from zero at conventional levels. The interval includes negative values up to fairly large positives, so the result is inconclusive.',
    correctAnswer: 'We cannot rule out no effect or a moderately large effect. The data do not provide strong evidence that the policy improved the outcome significantly, given p=0.15.',
    keyPhrases: ['DiD estimate', 'not significant', 'CI range'],
    explanation: 'A wide interval and p=0.15 indicates insufficient evidence to claim a robust positive effect.'
  },
  {
    id: 181,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'In a multi-arm experiment with arms A, B, and control, the post-hoc comparisons show A vs. control is p=0.03, B vs. control is p=0.06, but the overall F-test is p=0.07. Interpret the mixture of results.',
    content: 'The omnibus F-test suggests not significant at 5% across all arms together. But the pairwise test for A vs. control is individually significant. Possibly a multiple testing correction is needed, or the omnibus test has lower power for multiple arms.',
    correctAnswer: 'While A vs. control is significant at 0.03, the overall test is not. This discrepancy might reflect multiple comparisons or the nature of multi-arm tests. One arm might be effective even if the global test is borderline.',
    keyPhrases: ['multi-arm inference', 'omnibus vs. pairwise', 'p-value interpretation'],
    explanation: 'Omnibus tests can differ from pairwise tests. With multiple arms, we must consider Type I error corrections and interpret carefully.'
  },
  {
    id: 182,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A study with repeated baseline measures uses the average baseline measure in the analysis. The final effect size is 2.1 with narrower confidence intervals than a single baseline measure. Why narrower CIs?',
    content: 'Averaging multiple baseline measures reduces measurement error, thereby shrinking the residual variance in the model and leading to more precise effect estimates.',
    correctAnswer: 'Multiple baseline observations produce a more stable predictor, decreasing unexplained variability and thus tightening the confidence interval for the treatment effect.',
    keyPhrases: ['repeated baseline measure', 'precision gain', 'measurement error'],
    explanation: 'Less baseline measurement noise means we can better isolate the treatment effect, improving power and narrower intervals.'
  },
  {
    id: 183,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'After matching, the standardized difference in "income" is 0.03. Interpret this in the context of covariate balance.',
    content: 'A standardized difference of 0.03 is very small (less than 0.1), indicating negligible imbalance on income post-matching.',
    correctAnswer: 'It suggests that income is well balanced between treatment and control, as 0.03 is far below the typical 0.1 threshold for concern.',
    keyPhrases: ['standardized difference', 'balance interpretation', '<0.1 threshold'],
    explanation: 'A standardized difference near zero means minimal difference in means relative to pooled SD, indicating good covariate balance.'
  },
  {
    id: 184,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'In a power simulation: The computed power is 0.55 for detecting an effect size of 0.3 with alpha=0.05. Interpret the result for planning purposes.',
    content: 'A power of 0.55 is below the usual 0.80 benchmark, suggesting the study is underpowered to detect an effect of 0.3 with the chosen sample size and alpha=0.05.',
    correctAnswer: 'There is a 55% chance of detecting the effect if it is truly 0.3. This is generally considered inadequate for confirming significance in many fields.',
    keyPhrases: ['power simulation', 'inadequate power', 'study planning'],
    explanation: 'Researchers typically aim for at least 80% power, so 55% is insufficient for reliably detecting that effect size.'
  },
  {
    id: 185,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A linear regression of outcome on treatment uses a robust standard error approach. The coefficient is 5.0, robust SE=2.5, p=0.05. Summarize the inference.',
    content: 'The effect is borderline significant at the 5% level (t=2.0). The robust SE approach suggests a precise borderline scenario for the effect being around 5 points higher in the treatment group.',
    correctAnswer: 'With a robust SE of 2.5, the t-statistic is about 2.0, giving p=0.05. This indicates a borderline significant difference of 5 points for treatment, subject to robust standard errors assumptions.',
    keyPhrases: ['robust SE', 'borderline significance', 'linear regression'],
    explanation: 'The effect is possibly real but is on the edge of significance; robust standard errors guard against heteroskedasticity or mild correlation.'
  },
  {
    id: 186,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'In a cluster RCT with random assignment at the clinic level, a naive analysis ignoring clustering yields a p-value=0.01, while an analysis with cluster-robust SE yields p=0.09. Interpret why p changed.',
    content: 'Ignoring clustering underestimates standard errors, inflating significance. Correcting for within-cluster correlation yields a larger SE, thus a higher p-value.',
    correctAnswer: 'The naive approach treats all observations as independent, giving an artificially small standard error. Accounting for clustering raises the SE, lowering significance.',
    keyPhrases: ['cluster-robust SE', 'difference in p-values', 'overstated significance'],
    explanation: 'Proper cluster-based methods usually increase standard errors if there is positive intracluster correlation.'
  },
  {
    id: 187,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Researchers conduct 15 separate outcome measures in an RCT. Two measures yield p<0.05. The others do not. Without correction, how should we interpret the significance for those two measures?',
    content: 'They might be false positives due to multiple comparisons. We must consider the family-wise error rate or false discovery rate adjustments.',
    correctAnswer: 'Given 15 measures, we expect some false positives by chance at alpha=0.05, so the significance could be spurious unless properly corrected.',
    keyPhrases: ['multiple outcomes', 'multiple testing', 'false positive risk'],
    explanation: 'We cannot automatically claim those two outcomes are genuinely affected unless we correct for multiple comparisons or replicate the findings.'
  },
  {
    id: 188,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'A Bayesian approach yields a posterior mean of 1.2 for the treatment effect with a 95% credible interval [0.1, 2.3]. Summarize the interpretation from a Bayesian standpoint.',
    content: 'There is a 95% probability that the true effect lies between 0.1 and 2.3, given the prior and the observed data. The mean effect is 1.2.',
    correctAnswer: 'From the Bayesian perspective, the probability that the effect is between 0.1 and 2.3 is 95%, given the specified prior and likelihood.',
    keyPhrases: ['Bayesian interpretation', 'posterior mean', 'credible interval'],
    explanation: 'In Bayesian terms, a credible interval has a direct probability statement about the parameter, unlike the frequentist confidence interval interpretation.'
  },
  {
    id: 189,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'You see a Quarto report with R code producing a table of regression results but note the code chunk is set to eval: false. The table is still present. Interpret what might be happening.',
    content: 'The table might be a manually embedded static result that was not generated by the code at render time, risking mismatch between displayed results and actual code execution.',
    correctAnswer: 'Because eval is false, the chunk never runs. The table presumably was pre-generated or manually pasted. This can lead to stale or inconsistent results with the code shown.',
    keyPhrases: ['eval: false', 'Quarto chunk', 'manual output'],
    explanation: 'When eval=FALSE, the code doesn’t execute, so any displayed table is from prior runs or manually inserted. This can cause reproducibility issues.'
  },
  {
    id: 190,
    type: QUESTION_TYPES.STATISTICAL_INTERPRETATION,
    question: 'Researchers provide a bar chart of mean outcomes by treatment vs. control without confidence intervals or standard error bars. Interpret the caution needed here.',
    content: 'Without error bars or significance markers, we cannot judge the variability or statistical significance of the difference. The difference might be visually large but not statistically meaningful.',
    correctAnswer: 'We see only the mean difference visually, but have no sense of uncertainty or significance. One must check actual CIs or tests to interpret the reliability of the difference.',
    keyPhrases: ['bar chart', 'no error bars', 'interpretation caution'],
    explanation: 'Means alone can be misleading if the difference is within random variation. Interval estimates or p-values are essential to gauge significance.'

  },
  {
    id: 191,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have an RCT with high attrition in both arms but no baseline differences in attrition patterns. Which analysis method is typically most appropriate to maintain internal validity?',
    content: 'Some participants dropped out, but you suspect the dropout is random with respect to the outcome in each arm. You must analyze the final dataset properly.',
    correctAnswer: 'Intent-to-treat analysis, possibly with multiple imputation or weighting if missing data is substantial.',
    keyPhrases: ['RCT attrition', 'intent-to-treat', 'missing data approach'],
    explanation: 'An ITT approach maintains the original random assignment. If missingness is random, multiple imputation or weighting can address the missing outcomes.'
  },
  {
    id: 192,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'For a cluster-randomized design with 50 clinics, each with different sizes, which method is recommended to estimate treatment effects while accounting for cluster size variability?',
    content: 'Simple OLS may not handle the unequal cluster sizes or within-cluster correlation well.',
    correctAnswer: 'A mixed-effects model (e.g., random intercept for clinics) or GEE approach with appropriate weighting for cluster size.',
    keyPhrases: ['cluster-randomized', 'variable cluster size', 'mixed-effects', 'GEE'],
    explanation: 'Random intercept or GEE with robust variance can handle intracluster correlation and different cluster sizes.'
  },
  {
    id: 193,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'Suppose you have a 2×2 factorial design with 500 participants distributed equally among the four arms. You want to estimate the main effect of factor A and factor B, as well as their interaction. Which method is best?',
    content: 'You have balanced randomization across four conditions: A0B0, A1B0, A0B1, A1B1.',
    correctAnswer: 'A standard linear model with main effects for A and B plus an interaction term A×B, e.g. outcome ~ A + B + A:B.',
    keyPhrases: ['factorial design', 'main effects', 'interaction', 'linear model'],
    explanation: 'This linear model approach estimates separate parameters for A, for B, and their interaction, utilizing the factorial structure fully.'
  },
  {
    id: 194,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You suspect interference (spillovers) among individuals in different arms. Which design or analytical framework best addresses partial interference?',
    content: 'You believe individuals in the same group might influence each other, but not across groups. For instance, in small clusters, but no interference across clusters.',
    correctAnswer: 'Two-stage randomization or partial interference models that treat subsets as clusters. A hierarchical design can separate within-cluster spillovers from between-cluster effects.',
    keyPhrases: ['interference', 'partial interference model', 'two-stage randomization'],
    explanation: 'In partial interference, we assume no cross-cluster interference, so design or modeling must treat clusters as distinct for potential spillovers within them only.'
  },
  {
    id: 195,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have a small RCT (n=40) with strong prior beliefs about the effect size. Which approach might you consider if you want to formally incorporate these priors into your inference?',
    content: 'A frequentist approach may yield wide CIs with n=40. You have prior data or strong domain knowledge about effect magnitude.',
    correctAnswer: 'A Bayesian analysis that uses informative priors for the effect size, allowing the data and priors to combine in a posterior distribution.',
    keyPhrases: ['small sample', 'strong priors', 'Bayesian approach'],
    explanation: 'Bayesian methods can incorporate existing knowledge systematically, which is especially useful in small samples.'
  },
  {
    id: 196,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'For a multi-arm trial with 5 treatment variants and 1 control, your main interest is in identifying the "best" variant. Which approach is recommended for controlling false discoveries when comparing all variants to control?',
    content: 'You have multiple comparisons: T1 vs. C, T2 vs. C, T3 vs. C, T4 vs. C, T5 vs. C. That’s five comparisons at once.',
    correctAnswer: 'A multiple comparison procedure like Bonferroni, Holm, or a false discovery rate approach to adjust p-values across the five tests.',
    keyPhrases: ['multi-arm', 'multiple comparisons', 'MCP'],
    explanation: 'Without adjustment, the chance of a false positive among the five comparisons is high.'
  },
  {
    id: 197,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'When baseline covariates strongly predict your outcome in a randomized trial, which analysis approach can improve power over a simple difference-in-means?',
    content: 'You want to reduce residual variance and have good baseline data on relevant covariates.',
    correctAnswer: 'An ANCOVA/regression approach controlling for baseline covariates or using difference-in-differences if pre-treatment outcomes are available.',
    keyPhrases: ['ANCOVA', 'covariate adjustment', 'reduce variance'],
    explanation: 'A regression controlling for predictive baseline variables yields more precise estimates of the treatment effect in an RCT.'
  },
  {
    id: 198,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have repeated outcomes at multiple time points and want to account for correlation within subjects. Which method is typically used?',
    content: 'Data are structured in long format with repeated measurements per subject under random assignment.',
    correctAnswer: 'A mixed-effects model with random intercept (and possibly random slope) for each subject, or a GEE approach with an appropriate correlation structure.',
    keyPhrases: ['repeated measures', 'mixed-effects', 'GEE'],
    explanation: 'Both approaches handle correlated data across time within each subject, capturing within-subject correlation.'
  },
  {
    id: 199,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'If your design cannot ensure no interference across individuals, but you can randomize groups with minimal intergroup interaction, which randomization is preferable?',
    content: 'You suspect strong within-group spillovers if some get the intervention and some do not. Minimizing contamination across groups is crucial.',
    correctAnswer: 'Cluster randomization, where each group is assigned to either all treatment or all control, reducing cross-group contamination.',
    keyPhrases: ['cluster randomization', 'spillovers', 'group-level assignment'],
    explanation: 'Cluster randomization is used when contamination within groups is likely, thus assigning entire groups to a single condition.'
  },
  {
    id: 200,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You want to measure the direct and spillover effects of a school-based program. You can randomize at two levels: schools to high or low intensity, and students within schools to treatment or control. Which design suits this objective?',
    content: 'Measuring direct effect on those assigned to receive the program and spillover on those in the same school but assigned to control is the goal.',
    correctAnswer: 'A two-stage (or hierarchical) randomization design that first randomizes schools to intensity, then randomizes individuals within each school, enabling direct and indirect effect estimation.',
    keyPhrases: ['two-stage randomization', 'direct vs. spillover', 'hierarchical design'],
    explanation: 'This approach can differentiate the effect on treated students from the spillover on untreated peers in the same school.'
  },
  {
    id: 201,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'In analyzing a pilot RCT with extremely small sample size (n<20), which estimation or inference approach might handle the limited data more flexibly than classical large-sample methods?',
    content: 'Frequentist large-sample approximations (e.g., normal-based t-tests) might be inaccurate with n<20, especially if distributions are not normal.',
    correctAnswer: 'Permutation (randomization) tests or exact tests, possibly combined with Bayesian methods, as they do not rely as heavily on large-sample approximations.',
    keyPhrases: ['tiny sample', 'exact methods', 'permutation test'],
    explanation: 'Randomization inference or exact tests are robust alternatives when n is too small for normal approximations.'
  },
  {
    id: 202,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have a strong prior reason to believe the effect is heterogeneous by age. You want to estimate age-specific treatment effects. Which approach is recommended?',
    content: 'Age is a known effect modifier. Standard difference-in-means might hide real differences in subgroups.',
    correctAnswer: 'Include age × treatment interaction in a regression or use subgroup analyses by age strata, ensuring sample sizes in each stratum are adequate.',
    keyPhrases: ['heterogeneous treatment effects', 'interaction', 'subgroup analyses'],
    explanation: 'An interaction term or stratified analysis reveals how the effect depends on age.'
  },
  {
    id: 203,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'If you suspect a non-linear relationship between the dosage level (continuous variable) and the outcome, which modeling approach is appropriate?',
    content: 'We want to capture a flexible shape of the dose-response function, not just a linear slope.',
    correctAnswer: 'Use spline or polynomial terms for dosage in a regression model, or nonparametric methods to flexibly model the dose-response curve.',
    keyPhrases: ['non-linear dose-response', 'splines', 'polynomial terms'],
    explanation: 'Linear terms might be incorrect if the relationship is not linear. Splines or polynomials allow flexible functional forms.'
  },
  {
    id: 204,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You want to detect not only average effects but also identify which subgroups might benefit most from the treatment, using data-driven approaches. Which technique might you use?',
    content: 'You are looking at potentially applying causal machine learning or a method for exploring heterogeneous effects with multiple covariates.',
    correctAnswer: 'Methods like causal trees, causal forests, or other machine learning-based approaches for heterogeneous treatment effect estimation.',
    keyPhrases: ['subgroup discovery', 'machine learning', 'causal forests'],
    explanation: 'Causal trees/forests systematically partition the covariate space to estimate subgroup-specific treatment effects.'
  },
  {
    id: 205,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'For a re-randomization design, how do you properly account for the re-randomization procedure when estimating p-values or confidence intervals?',
    content: 'Standard t-tests ignore the conditioning on a specific "balanced" assignment. A design-based approach can fix this.',
    correctAnswer: 'Use design-aware inference (e.g., the mirrored or re-randomization-based distribution) to generate correct p-values, or use specialized formula that accounts for the acceptance probability.',
    keyPhrases: ['re-randomization inference', 'conditional distribution', 'design-based approach'],
    explanation: 'One must incorporate the fact that randomizations not meeting the balance criterion were discarded, altering the distribution of possible assignments.'
  },
  {
    id: 206,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'In analyzing repeated measures where each subject is tested multiple times, you want to avoid assumptions about the correlation structure. Which method is suitable?',
    content: 'A method that uses robust standard errors for repeated measures without heavily specifying the correlation pattern is desired.',
    correctAnswer: 'A GEE approach (Generalized Estimating Equations) with a working correlation matrix or robust sandwich estimator can handle this flexibly.',
    keyPhrases: ['repeated measures', 'GEE', 'working correlation matrix'],
    explanation: 'GEE can handle correlated outcomes within subjects, providing robust inference even if the correlation structure is misspecified.'
  },
  {
    id: 207,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You want to systematically explore how well different randomization schemes (simple vs. stratified vs. matched pairs) might perform for your planned sample. Which approach can you use before data collection?',
    content: 'We want to compare potential power or balance across these designs. We can do a simulation-based approach to test each randomization design scenario.',
    correctAnswer: 'Simulation-based design diagnosis (e.g., using the DeclareDesign or custom simulations) to compare performance of different randomization strategies pre-study.',
    keyPhrases: ['simulation-based design', 'declare design', 'comparing randomization'],
    explanation: 'By simulating data under plausible scenarios, you can estimate how each randomization method might achieve balance or power.'
  },
  {
    id: 208,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'When analyzing a matched-pair cluster design where each pair is formed by two similar clusters, which method effectively uses that pairing structure?',
    content: 'We have matched pairs of clusters, each assigned to treatment or control, so the difference is between matched clusters.',
    correctAnswer: 'Include pair fixed effects or do a paired analysis at the cluster level, analyzing matched pairs of clusters to remove pair-level confounding.',
    keyPhrases: ['matched cluster pairs', 'pair FE', 'paired analysis'],
    explanation: 'This approach parallels matched individual pairs: the difference between matched clusters is the main source of variation.'
  },
  {
    id: 209,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'For a pilot program with uncertain effect sizes and limited theoretical guidance, which design might you use to efficiently test multiple conditions concurrently?',
    content: 'We have limited prior knowledge, multiple interventions, small budgets, seeking broad info quickly.',
    correctAnswer: 'A factorial or fractional factorial design can test multiple interventions and potential interactions in fewer runs.',
    keyPhrases: ['factorial design', 'test multiple interventions', 'efficiency'],
    explanation: 'Factorial designs allow multiple interventions to be examined in combination, saving resources compared to separate trials.'
  },
  {
    id: 210,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'If your outcome is ordinal (e.g., satisfaction ratings on a 1–5 scale) and not necessarily continuous, which analysis method might be more appropriate than a standard linear model?',
    content: 'You prefer an approach that respects the ordinal nature of the data rather than treating it as purely numeric or binary.',
    correctAnswer: 'An ordinal logistic (proportional odds) model or a non-parametric test like the Wilcoxon rank-sum if analyzing two groups.',
    keyPhrases: ['ordinal data', 'ordinal logistic', 'non-parametric'],
    explanation: 'Ordinal logistic regression treats the ordered categories properly, while linear regression might not capture the ordinal nature.'
  },
  {
    id: 211,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'In a trial designed to estimate the entire distribution of outcomes (not just means), which approach or measure can be used?',
    content: 'You want distributional treatment effects, maybe differences in quantiles, not just the average effect.',
    correctAnswer: 'Quantile treatment effect methods or distributional regression techniques that compare outcome distributions across treatment arms.',
    keyPhrases: ['distributional effects', 'quantile treatment effect', 'beyond the mean'],
    explanation: 'QTE methods allow estimation of differences at various quantiles, revealing how the treatment shifts the entire outcome distribution.'
  },
  {
    id: 212,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have strong reasons to suspect your outcome data are zero-inflated or overdispersed counts (like healthcare visits). Which specialized approach might handle that properly?',
    content: 'A standard Poisson model might not fit well if variance > mean or if many zeros exist beyond Poisson expectation.',
    correctAnswer: 'A zero-inflated or negative binomial model can handle overdispersion and extra zeros in count data more accurately.',
    keyPhrases: ['count data', 'overdispersion', 'zero-inflated model'],
    explanation: 'Negative binomial extends Poisson for overdispersion, and zero-inflated models incorporate an extra process generating zeros.'
  },
  {
    id: 213,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'If your main goal is to identify the subset of participants for whom the intervention is most beneficial, which design extension or analysis might you consider?',
    content: 'Focus on treatment assignment rules or personalization (like "optimal policy" selection). Possibly a policy-learning approach.',
    correctAnswer: 'A policy learning or personalized treatment rule approach, e.g., using reinforcement learning or causal forest to find subgroups that respond best.',
    keyPhrases: ['policy learning', 'optimal treatment rule', 'subgroup identification'],
    explanation: 'Such methods aim to find which covariates predict bigger gains, recommending the intervention selectively for best outcomes.'
  },
  {
    id: 214,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You plan to measure multiple outcomes in different domains (health, psychosocial, economic) for the same participants. Which single summary measure might you use to reduce multiple comparisons?',
    content: 'Sometimes you want an index or composite to limit the family of tests needed for each dimension separately.',
    correctAnswer: 'Construct a standardized index or principal component that aggregates across relevant outcomes in each domain, then test the effect on that index.',
    keyPhrases: ['composite index', 'principal component', 'reduce dimension'],
    explanation: 'Aggregating correlated outcomes into a single index helps avoid large Type I error inflation from multiple separate tests.'
  },
  {
    id: 215,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'When you only have partial compliance but want to estimate the "Complier Average Causal Effect" (CACE), which standard approach is commonly used in an RCT setting?',
    content: 'Compliance is measured, but not all assigned to treatment comply. We want the local average treatment effect among compliers.',
    correctAnswer: 'An instrumental variables approach (two-stage least squares) with random assignment as the instrument for actual treatment received.',
    keyPhrases: ['partial compliance', 'instrumental variables', 'CACE'],
    explanation: 'In an RCT with noncompliance, assignment is an instrument for actual treatment, giving the CACE or LATE estimate.'
  },
  {
    id: 216,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have an RCT but suspect missing outcomes are related to the unobserved potential outcome. Which method is recommended to handle non-ignorable missingness?',
    content: 'Standard multiple imputation assumes missing at random. But you fear some might systematically drop out due to poor outcomes, for example.',
    correctAnswer: 'A selection model or pattern-mixture model that explicitly accounts for the mechanism by which data become missing not at random (MNAR).',
    keyPhrases: ['MNAR', 'selection model', 'pattern-mixture'],
    explanation: 'If missingness depends on unobserved outcomes, advanced methods that model the missingness mechanism are needed.'
  },
  {
    id: 217,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'If you want to ensure exactly the same proportion of female and male participants in each arm, which randomization method is most suitable?',
    content: 'Sex is a key covariate that you want balanced absolutely, not just in expectation.',
    correctAnswer: 'Stratified randomization by gender ensures a 50:50 split within each gender stratum, guaranteeing perfect balance on that variable.',
    keyPhrases: ['stratified randomization', 'guaranteed proportion', 'covariate balance'],
    explanation: 'Within each gender stratum, half (or desired ratio) are assigned to treatment, ensuring exact matching on that dimension.'
  },
  {
    id: 218,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You have strong reason to believe the main effect is linear in X but also want to allow for flexible interactions or non-linearities in other covariates. Which regression approach might you use?',
    content: 'We can specify a linear effect for X but remain flexible for other variables. Possibly partial linear or semiparametric methods.',
    correctAnswer: 'A partially linear (semiparametric) model, e.g., a linear term for X plus a nonparametric function for other covariates.',
    keyPhrases: ['partial linear model', 'semiparametric', 'flexibility in other covariates'],
    explanation: 'Partially linear models fix a linear form for some variables and allow nonparametric or flexible modeling for others.'
  },
  {
    id: 219,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'You want to analyze data from a matched cluster design and suspect the effect might differ by cluster size. Which advanced approach can handle variation in both matching and cluster size?',
    content: 'We have matched pairs of clusters plus differences in cluster sizes within pairs. Possibly a hierarchical model with random effects plus pair blocking.',
    correctAnswer: 'A random-effects or hierarchical model that includes random intercepts for pairs and accounts for cluster-level variation, e.g. a multi-level approach with pair and cluster random intercepts.',
    keyPhrases: ['matched cluster design', 'multi-level model', 'random intercept for pair'],
    explanation: 'Such a model can handle the pairing (block) effect and cluster size differences simultaneously, properly capturing variation.'
  },
  {
    id: 220,
    type: QUESTION_TYPES.METHOD_SELECTION,
    question: 'In a stepping-wedge design with random assignment of the timing for each cluster to implement the intervention, how do you typically analyze the effect over time?',
    content: 'Each cluster transitions at a different wave; you measure repeated outcomes. Possibly partial incomplete design if some clusters adopt later or never.',
    correctAnswer: 'A mixed-effects or GEE approach with time and treatment indicators, plus random cluster intercepts, capturing within-cluster correlation and time trends.',
    keyPhrases: ['stepping-wedge design', 'time of adoption', 'mixed-effects', 'GEE'],
    explanation: 'In stepping-wedge, a common approach is to use repeated measures of clusters over time in a multi-level framework to estimate the effect as clusters switch to treatment.'
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
