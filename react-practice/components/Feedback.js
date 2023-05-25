import { useState } from "react";

const Feedback = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleGood = () => {
    setFeedback({ ...feedback, good: feedback.good + 1 });
  };

  const handleNeutral = () => {
    setFeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };

  const handleBad = () => {
    setFeedback({ ...feedback, bad: feedback.bad + 1 });
  };

  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const average = total > 0 ? (good - bad) / total : 0;

  return (
    <>
      <h1>Please Rate Us</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h2>Statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {average}</p>
    </>
  );
};

export default Feedback;
