import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

const TypingPage: React.FC = () => {
  const [quote, setQuote] = React.useState<QuoteType | null>(null);
  const [text, setText] = React.useState<string>("");
  const [checkpoint, setCheckpoint] = React.useState<number>(0);
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
    // making typescript happy
    if (!quote) return;

    if (startTime === 0) {
      setStartTime(Date.now());
    }

    if (correct + wrong > quote.content.length) {
      return;
    }

    const char = String.fromCharCode(event.charCode);
    setText(`${text}${char}`);

    if (char === quote.content[correct] && wrong === 0) {

      if (char === " ") {
        setText("")
        setCheckpoint(correct + 1);
      }

      // checking the end condition here so it triggers appropriately
      if (correct === quote.content.length - 1) {
        setEndTime(Date.now());
        setFinished(true);
      }
      setCorrect(correct + 1)
    } else {
      setWrong(wrong + 1)
    }
  }

  // handling character removal
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Backspace") return;

    // we have correctly typed a word and can't go back
    if (correct + wrong === checkpoint) {
      return;
    }

    setText(text.substring(0, text.length - 1));

    if (wrong === 0) {
      setCorrect((correct <= 0 ? 0 : correct - 1));
    } else {
      setWrong((wrong <= 0 ? 0 : wrong - 1));
    }
  }

  if (!quote) {
    return <p>Loading...</p>;
  }

  const totalTyped = correct + wrong;
  let startIndex = quote.content.lastIndexOf(" ", totalTyped);
  let endIndex = quote.content.indexOf(" ", totalTyped);
  startIndex = startIndex === -1 ? totalTyped : startIndex;
  endIndex = endIndex === -1 ? quote.content.length : endIndex;
  
  const correctBeforeEndIndex = correct > startIndex ? startIndex : correct;
  const currentWordCorrectEndIndex = correct < startIndex ? startIndex : correct > endIndex ? endIndex : correct;
  const currentWordWrongEndIndex = totalTyped > endIndex ? endIndex : totalTyped;
  const typedWrongEndIndex = totalTyped > endIndex ? totalTyped : endIndex;

  const typedCorrectBefore = quote.content.substring(0, correctBeforeEndIndex);
  const typedWrongBefore = quote.content.substring(correctBeforeEndIndex, startIndex);
  const currentWordCorrect = quote.content.substring(startIndex, currentWordCorrectEndIndex);
  const currentWordWrong = quote.content.substring(currentWordCorrectEndIndex, currentWordWrongEndIndex);
  const currentWordNotTyped = quote.content.substring(currentWordWrongEndIndex, endIndex);
  const typedWrong = quote.content.substring(endIndex, typedWrongEndIndex);
  const notTyped = quote.content.substring(typedWrongEndIndex);

  return (
    <div className="bg-blue-300 h-screen font-mono">
      <div className="container mx-auto h-full flex justify-center items-center">
        <div className="rounded bg-blue-100 w-2/3 shadow-lg px-6 py-6">
        <p className="pb-4">
          <span className="text-correct">{typedCorrectBefore}</span>
          <span className="text-wrong">{typedWrongBefore}</span>
          <span className="whitespace-no-wrap">
          <span className="text-correct">{currentWordCorrect}</span>
          <span className="text-wrong">{currentWordWrong}</span>
          <span className="fake-caret">&nbsp;</span>
          <span>{currentWordNotTyped}</span></span>
          <span className="text-wrong">{typedWrong}</span>
          <span>{notTyped}</span>
        </p>
      {finished ?
        <div>
          <p>Finished!</p>
          <p>Speed: {Math.round((quote.content.length / 5) / ((endTime - startTime) / 60000))} WPM</p>
        </div>
      :
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                     leading-tight focus:outline-none focus:shadow-outline"
          value={text}
          onChange={() => { return; }}
          onKeyPress={event => handleKeyPress(event)}
          onKeyDown={event => handleKeyDown(event)}
          maxLength={quote.content.length}
        />
      }
      </div>
    </div>
    </div>
  );
};

export default TypingPage;