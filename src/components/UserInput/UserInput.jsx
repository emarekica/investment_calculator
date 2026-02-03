export default function UserInput({userInput, onChange}) {
  return (
    <section id="user-input">
      <div className="input-group">
        <label htmlFor="initial-investment">
          Initial investment
          <input
            type="number"
            id="initial-investment"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              onChange('initialInvestment', event.target.value)
            }
            aria-label="initial-investment"
            aria-required="true"
          />
        </label>

        <label htmlFor="annual-investment">
          Annual investment
          <input
            type="number"
            id="annual-investment"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              onChange('annualInvestment', event.target.value)
            }
            aria-label="annual-investment"
            aria-required="true"
          />
        </label>
      </div>

      <div className="input-group">
        <label htmlFor="expected-return">
          Expected return
          <input
            type="number"
            id="expected-return"
            required
            value={userInput.expectedReturn}
            onChange={(event) =>
              onChange('expectedReturn', event.target.value)
            }
            aria-label="expected-return"
            aria-required="true"
          />
        </label>

        <label htmlFor="duration">
          Duration
          <input
            type="number"
            id="duration"
            required
            value={userInput.duration}
            onChange={(event) =>
              onChange('duration', event.target.value)
            }
            aria-label="duration"
            aria-required="true"
          />
        </label>
      </div>
    </section>
  );
}
