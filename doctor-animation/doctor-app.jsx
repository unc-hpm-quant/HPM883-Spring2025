import React, { useState, useEffect, useRef } from 'react';

// Generate a fixed set of patients with potential outcomes
const generatePatients = (count = 10) => {
  // Fixed seed for reproducibility - using predetermined values
  const baseY0 = [45, 62, 38, 71, 55, 48, 67, 42, 58, 35];
  const baseY1 = [52, 58, 55, 65, 70, 40, 72, 60, 50, 48];

  return Array.from({ length: count }, (_, i) => {
    const y0 = baseY0[i % baseY0.length] + (i >= 10 ? Math.floor(i / 10) * 5 : 0);
    const y1 = baseY1[i % baseY1.length] + (i >= 10 ? Math.floor(i / 10) * 5 : 0);
    const delta = y1 - y0;

    return {
      id: i + 1,
      name: `Patient ${i + 1}`,
      y0, // Potential outcome if untreated
      y1, // Potential outcome if treated
      delta, // Individual treatment effect
      assigned: null, // Will be 'treatment' or 'control'
      observed: null, // The observed outcome
    };
  });
};

// Calculate statistics
const calculateStats = (patients) => {
  const treated = patients.filter(p => p.assigned === 'treatment');
  const control = patients.filter(p => p.assigned === 'control');

  if (treated.length === 0 || control.length === 0) {
    return { naiveATE: null, trueATE: null, bias: null };
  }

  // True ATE (what we want to estimate)
  const trueATE = patients.reduce((sum, p) => sum + p.delta, 0) / patients.length;

  // Naive estimate: E[Y|D=1] - E[Y|D=0]
  const avgTreated = treated.reduce((sum, p) => sum + p.y1, 0) / treated.length;
  const avgControl = control.reduce((sum, p) => sum + p.y0, 0) / control.length;
  const naiveATE = avgTreated - avgControl;

  // Selection bias
  const bias = naiveATE - trueATE;

  return {
    naiveATE: naiveATE.toFixed(2),
    trueATE: trueATE.toFixed(2),
    bias: bias.toFixed(2),
    avgTreated: avgTreated.toFixed(2),
    avgControl: avgControl.toFixed(2),
    nTreated: treated.length,
    nControl: control.length
  };
};

export const DoctorAnimation = () => {
  const [patients, setPatients] = useState(generatePatients(10));
  const [scenario, setScenario] = useState(null); // 'perfect', 'bad', 'random'
  const [animationStep, setAnimationStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCounterfactuals, setShowCounterfactuals] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [showExplanation, setShowExplanation] = useState(true);
  const animationRef = useRef(null);

  // Reset patients
  const resetPatients = () => {
    setPatients(generatePatients(10));
    setAnimationStep(0);
    setIsAnimating(false);
    setScenario(null);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Assign treatment based on scenario
  const assignTreatment = (patient, scenarioType) => {
    switch (scenarioType) {
      case 'perfect':
        // Perfect doctor: treats only if treatment helps (delta > 0)
        return patient.delta > 0 ? 'treatment' : 'control';
      case 'bad':
        // Bad doctor: treats only if treatment hurts (delta < 0)
        return patient.delta < 0 ? 'treatment' : 'control';
      case 'random':
        // Random assignment: 50/50 chance
        return Math.random() > 0.5 ? 'treatment' : 'control';
      default:
        return null;
    }
  };

  // Run animation
  const runAnimation = (scenarioType) => {
    setScenario(scenarioType);
    setAnimationStep(0);
    setIsAnimating(true);

    // Reset all patients first
    setPatients(prev => prev.map(p => ({ ...p, assigned: null, observed: null })));

    let step = 0;
    const animate = () => {
      if (step < patients.length) {
        setPatients(prev => {
          const newPatients = [...prev];
          const assignment = assignTreatment(newPatients[step], scenarioType);
          newPatients[step] = {
            ...newPatients[step],
            assigned: assignment,
            observed: assignment === 'treatment' ? newPatients[step].y1 : newPatients[step].y0
          };
          return newPatients;
        });
        setAnimationStep(step + 1);
        step++;
        animationRef.current = setTimeout(animate, animationSpeed);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = setTimeout(animate, 500);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const stats = calculateStats(patients);

  const getScenarioTitle = () => {
    switch (scenario) {
      case 'perfect': return 'Perfect Doctor';
      case 'bad': return 'Bad Doctor';
      case 'random': return 'Random Assignment';
      default: return 'Select a Scenario';
    }
  };

  const getScenarioDescription = () => {
    switch (scenario) {
      case 'perfect':
        return 'The "perfect" doctor knows each patient\'s treatment effect and only treats those who will benefit (δ > 0). This seems ideal but creates severe selection bias!';
      case 'bad':
        return 'The "bad" doctor perversely only treats patients who will be harmed by treatment (δ < 0). This is the opposite extreme, also creating bias.';
      case 'random':
        return 'Random assignment ignores individual effects and assigns treatment by chance. This eliminates selection bias and allows unbiased estimation of the ATE.';
      default:
        return 'Choose a scenario to see how different assignment mechanisms affect our ability to estimate treatment effects.';
    }
  };

  return (
    <div className="doctor-container">
      <h1 className="doctor-title">The Perfect Doctor Problem</h1>
      <p className="doctor-subtitle">
        An Interactive Demonstration of Selection Bias in Treatment Assignment
      </p>

      {/* Control Panel */}
      <div className="control-panel">
        <div className="scenario-buttons">
          <button
            onClick={() => runAnimation('perfect')}
            disabled={isAnimating}
            className={`scenario-btn perfect ${scenario === 'perfect' ? 'active' : ''}`}
          >
            Perfect Doctor
          </button>
          <button
            onClick={() => runAnimation('bad')}
            disabled={isAnimating}
            className={`scenario-btn bad ${scenario === 'bad' ? 'active' : ''}`}
          >
            Bad Doctor
          </button>
          <button
            onClick={() => runAnimation('random')}
            disabled={isAnimating}
            className={`scenario-btn random ${scenario === 'random' ? 'active' : ''}`}
          >
            Random Assignment
          </button>
        </div>

        <div className="control-options">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showCounterfactuals}
              onChange={(e) => setShowCounterfactuals(e.target.checked)}
            />
            Show Counterfactuals (Y⁰, Y¹)
          </label>

          <label className="speed-label">
            Speed:
            <select
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              disabled={isAnimating}
            >
              <option value={1200}>Slow</option>
              <option value={800}>Normal</option>
              <option value={400}>Fast</option>
            </select>
          </label>

          <button onClick={resetPatients} disabled={isAnimating} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

      {/* Scenario Description */}
      <div className={`scenario-info ${scenario ? 'active' : ''}`}>
        <h3>{getScenarioTitle()}</h3>
        <p>{getScenarioDescription()}</p>
      </div>

      {/* Main Animation Area */}
      <div className="animation-area">
        {/* Doctor Visual */}
        <div className="doctor-visual">
          <div className={`doctor-icon ${isAnimating ? 'thinking' : ''} ${scenario || ''}`}>
            <svg viewBox="0 0 100 100" className="doctor-svg">
              {/* Doctor body */}
              <circle cx="50" cy="30" r="20" fill="#f5d0c5" />
              <rect x="30" y="48" width="40" height="45" rx="5" fill="#fff" stroke="#13294B" strokeWidth="2" />
              {/* Stethoscope */}
              <path d="M35 55 Q25 70 40 80" fill="none" stroke="#4B9CD3" strokeWidth="3" />
              <circle cx="40" cy="80" r="5" fill="#4B9CD3" />
              {/* Face */}
              <circle cx="43" cy="28" r="3" fill="#333" />
              <circle cx="57" cy="28" r="3" fill="#333" />
              <path d="M45 38 Q50 42 55 38" fill="none" stroke="#333" strokeWidth="2" />
              {/* Thought bubble when animating */}
              {isAnimating && (
                <>
                  <circle cx="80" cy="20" r="4" fill="#e2e8f0" className="thought-bubble" />
                  <circle cx="85" cy="12" r="6" fill="#e2e8f0" className="thought-bubble" />
                  <ellipse cx="92" cy="5" rx="8" ry="5" fill="#e2e8f0" className="thought-bubble" />
                  <text x="92" y="7" textAnchor="middle" fontSize="6" fill="#333">δ?</text>
                </>
              )}
            </svg>
            <div className="doctor-label">
              {scenario === 'perfect' && 'Only treating benefiters!'}
              {scenario === 'bad' && 'Only treating those harmed!'}
              {scenario === 'random' && 'Flipping a coin...'}
              {!scenario && 'Waiting for assignment rule...'}
            </div>
          </div>
        </div>

        {/* Patient Table */}
        <div className="patient-table-container">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient</th>
                {showCounterfactuals && <th>Y⁰</th>}
                {showCounterfactuals && <th>Y¹</th>}
                {showCounterfactuals && <th>δᵢ</th>}
                <th>Assignment</th>
                <th>Observed Y</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className={`
                    patient-row
                    ${patient.assigned ? 'assigned' : ''}
                    ${patient.assigned === 'treatment' ? 'treated' : ''}
                    ${patient.assigned === 'control' ? 'control' : ''}
                    ${index === animationStep - 1 && isAnimating ? 'just-assigned' : ''}
                  `}
                >
                  <td className="patient-name">{patient.name}</td>
                  {showCounterfactuals && (
                    <td className={`outcome y0 ${patient.assigned === 'control' ? 'observed' : 'counterfactual'}`}>
                      {patient.y0}
                    </td>
                  )}
                  {showCounterfactuals && (
                    <td className={`outcome y1 ${patient.assigned === 'treatment' ? 'observed' : 'counterfactual'}`}>
                      {patient.y1}
                    </td>
                  )}
                  {showCounterfactuals && (
                    <td className={`delta ${patient.delta > 0 ? 'positive' : patient.delta < 0 ? 'negative' : 'zero'}`}>
                      {patient.delta > 0 ? '+' : ''}{patient.delta}
                    </td>
                  )}
                  <td className="assignment">
                    {patient.assigned && (
                      <span className={`assignment-badge ${patient.assigned}`}>
                        {patient.assigned === 'treatment' ? 'Treatment' : 'Control'}
                      </span>
                    )}
                  </td>
                  <td className="observed">
                    {patient.observed !== null ? patient.observed : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Panel */}
      <div className={`stats-panel ${stats.naiveATE !== null ? 'active' : ''}`}>
        <h3>Estimation Results</h3>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">True ATE</div>
            <div className="stat-value true-ate">
              {stats.trueATE !== null ? stats.trueATE : '—'}
            </div>
            <div className="stat-note">E[Y¹ - Y⁰]</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Naive Estimate</div>
            <div className="stat-value naive-ate">
              {stats.naiveATE !== null ? stats.naiveATE : '—'}
            </div>
            <div className="stat-note">E[Y|D=1] - E[Y|D=0]</div>
          </div>

          <div className="stat-card highlight">
            <div className="stat-label">Selection Bias</div>
            <div className={`stat-value bias ${parseFloat(stats.bias) > 0 ? 'positive' : parseFloat(stats.bias) < 0 ? 'negative' : ''}`}>
              {stats.bias !== null ? (parseFloat(stats.bias) > 0 ? '+' : '') + stats.bias : '—'}
            </div>
            <div className="stat-note">Naive - True</div>
          </div>
        </div>

        {stats.naiveATE !== null && (
          <div className="stats-breakdown">
            <div className="breakdown-row">
              <span>Avg. outcome for treated (n={stats.nTreated}):</span>
              <span className="breakdown-value">{stats.avgTreated}</span>
            </div>
            <div className="breakdown-row">
              <span>Avg. outcome for control (n={stats.nControl}):</span>
              <span className="breakdown-value">{stats.avgControl}</span>
            </div>
          </div>
        )}
      </div>

      {/* Explanation Panel */}
      {showExplanation && stats.naiveATE !== null && (
        <div className={`explanation-panel ${scenario}`}>
          <h3>What's Happening?</h3>
          {scenario === 'perfect' && (
            <div className="explanation-content">
              <p>
                <strong>The Paradox of the Perfect Doctor:</strong> By only treating patients who benefit
                (δ &gt; 0), the treated group has systematically higher Y¹ values, while the control group
                has systematically lower Y⁰ values.
              </p>
              <p>
                The naive comparison E[Y|D=1] - E[Y|D=0] = {stats.naiveATE} <strong>overestimates</strong> the
                true treatment effect of {stats.trueATE} by {Math.abs(parseFloat(stats.bias)).toFixed(2)} points!
              </p>
              <p className="key-insight">
                <strong>Key Insight:</strong> Even perfect knowledge about treatment effects leads to biased
                estimates because we're comparing apples to oranges—patients who benefit vs. patients who don't.
              </p>
            </div>
          )}
          {scenario === 'bad' && (
            <div className="explanation-content">
              <p>
                <strong>The Perverse Doctor:</strong> By only treating patients who are harmed
                (δ &lt; 0), the treated group has systematically lower Y¹ values than average, while
                the control group has patients who would have benefited.
              </p>
              <p>
                The naive comparison E[Y|D=1] - E[Y|D=0] = {stats.naiveATE} <strong>underestimates</strong> the
                true treatment effect of {stats.trueATE} by {Math.abs(parseFloat(stats.bias)).toFixed(2)} points!
              </p>
              <p className="key-insight">
                <strong>Key Insight:</strong> Selection based on treatment effects—in either direction—creates
                bias. The problem isn't the direction of selection, it's selection itself.
              </p>
            </div>
          )}
          {scenario === 'random' && (
            <div className="explanation-content">
              <p>
                <strong>The Power of Randomization:</strong> By assigning treatment randomly, both groups
                contain a mix of patients—some who benefit and some who don't.
              </p>
              <p>
                The naive comparison E[Y|D=1] - E[Y|D=0] = {stats.naiveATE} is an <strong>unbiased estimate</strong> of
                the true treatment effect of {stats.trueATE}. The bias of {stats.bias} is due only to random sampling variation.
              </p>
              <p className="key-insight">
                <strong>Key Insight:</strong> Randomization makes treatment independent of potential outcomes,
                eliminating selection bias. This is why RCTs are the "gold standard" for causal inference!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Formula Reference */}
      <div className="formula-reference">
        <h4>Key Formulas</h4>
        <div className="formula-grid">
          <div className="formula">
            <span className="formula-name">Individual Treatment Effect:</span>
            <span className="formula-math">δᵢ = Y¹ᵢ - Y⁰ᵢ</span>
          </div>
          <div className="formula">
            <span className="formula-name">Average Treatment Effect:</span>
            <span className="formula-math">ATE = E[Y¹ - Y⁰]</span>
          </div>
          <div className="formula">
            <span className="formula-name">Naive Estimate:</span>
            <span className="formula-math">E[Y|D=1] - E[Y|D=0]</span>
          </div>
          <div className="formula">
            <span className="formula-name">Selection Bias:</span>
            <span className="formula-math">E[Y⁰|D=1] - E[Y⁰|D=0]</span>
          </div>
        </div>
      </div>
    </div>
  );
};
