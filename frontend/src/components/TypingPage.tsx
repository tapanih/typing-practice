import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const TypingPage: React.FC = () => {
  const [quote, setQuote] = React.useState<QuoteType | null>(null);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(0);
  const [finished, setFinished] = React.useState<boolean>(false);
  const [correct, setCorrect] = React.useState<number>(0);
  const [wrong, setWrong] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchRandomQuote = async () => {
      try {
        const { data: randomQuote } = await axios.get<QuoteType>(
          `${apiBaseUrl}/quotes/random`
        );
        setQuote(randomQuote);
      } catch (e) {
        console.error("Error while fetching quote");
      }
    }
    fetchRandomQuote();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!quote) return;
    if (startTime === 0) {
      setStartTime(Date.now());
    }
    const char = String.fromCharCode(event.charCode);

    if (char === quote.content[correct] && wrong === 0) {
      setCorrect(correct + 1)
    } else {
      setWrong(wrong + 1)
    }

    if (correct === quote.content.length - 1) {
      setEndTime(Date.now());
      setFinished(true);
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") return;

    if (wrong === 0) {
      setCorrect((correct <= 0 ? 0 : correct - 1));
    } else {
      setWrong((wrong <= 0 ? 0 : wrong - 1));
    }
  }

  if (!quote) {
    return <p>Loading...</p>;
  }

  const typedCorrect = quote.content.substring(0, correct);
  const typedWrong = quote.content.substring(correct, correct + wrong);
  const notTyped = quote.content.substring(correct + wrong);

  return (
    <div>
      <p>
        <span style={{ color: 'green'}}>{typedCorrect}</span>
        <span style={{ color: 'red'}}>{typedWrong}</span>
        <span>{notTyped}</span>
      </p>
      {finished ?
        <div>
          <p>Finished!</p>
          <p>Speed: {Math.round((quote.content.length / 5) / ((endTime - startTime) / 60000))} WPM</p>
        </div>
      :
        <input 
          onKeyPress={event => handleKeyPress(event)}
          onKeyDown={event => handleKeyDown(event)}
          maxLength={quote.content.length}
        />
      }
    </div>
  );
};

export default TypingPage;