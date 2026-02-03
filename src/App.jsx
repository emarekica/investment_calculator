import { useState } from 'react';

import Header from "./components/Header/Header.jsx";
import UserInput from "./components/UserInput/UserInput.jsx";
import Results from './components/Results/Results.jsx';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: "",
    annualInvestment: "",
    expectedReturn: "",
    duration: "",
  });

  const inputIsValid = userInput.duration >= 1;

  function handleUserInput(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      }
    });
  }

  return (
    <>
      <Header />
      <UserInput
        userInput={userInput}
        onChange={handleUserInput}/>
        {!inputIsValid && <p className="center">Please enter duration greater than 0.</p>}
        {inputIsValid && <Results input={userInput}/>}
    </>
  );
}

export default App;
