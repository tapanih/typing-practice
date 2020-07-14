import React from 'react';
import { QuoteType } from '../../../backend/src/types';
import { useStateValue } from '../state';
import quoteService from '../services/quoteService';
import resultService from '../services/resultService';
import handleErrors from '../helpers/handleErrors';

const TypingPage: React.FC = () => {
  const [state, dispatch] = useStateValue();
  const [quote, setQuote] = React.useState<QuoteType | null>(null);
  const [text, setText] = React.useState<string>("");
  const [checkpoint, setCheckpoint] = React.useState<number>(0);
  const [startTime, setStartTime] = React.useState<number>(0);
  const [endTime, setEndTime] = React.useState<number>(0);
  const [finished, setFinished] = React.useState<boolean>(false);
  const [correct, setCorrect] = React.useState<number>(0);
  const [wrong, setWrong] = React.useState<number>(0);
  const [typos, setTypos] = React.useState<number>(0);

  const fetchRandomQuote = async () => {
    try {
      const randomQuote = await quoteService.getRandom();
      setQuote(randomQuote);
    } catch (e) {
      console.error("Error while fetching quote");
    }
  };

  React.useEffect(() => {
    fetchRandomQuote();
  }, []);

  const onFinish = async (quote: QuoteType) => {
    setEndTime(Date.now());
    setFinished(true);

    if (state.user === null || !quote.id) {
      return;
    }

    const wpm = Math.round((quote.content.length / 5) / ((Date.now() - startTime) / 60000));
    const accuracy = Math.round((quote.content.length - typos) / quote.content.length * 100);
    try {
      await resultService.addResult({
        wpm,
        accuracy,
        quoteId: quote.id
      });
    } catch (error) {
      handleErrors(error, dispatch);
    }
  }

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
        setText("");
        setCheckpoint(correct + 1);
      }

      // checking the end condition here so it triggers appropriately
      if (correct === quote.content.length - 1) {
        onFinish(quote);
      }
      setCorrect(correct + 1);
    } else {
      setWrong(wrong + 1);
      setTypos(typos + 1);
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

  const reset = () => {
    fetchRandomQuote();
    setText("");
    setCheckpoint(0);
    setStartTime(0);
    setEndTime(0);
    setFinished(false);
    setCorrect(0);
    setWrong(0);
    setTypos(0);
  };

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

  const inputClassString = wrong === 0 
    ? "text-input bg-white"
    : "text-input bg-red-300";

  return (
    <div className="container mx-auto h-full flex justify-center items-center">
      <div className="container rounded bg-blue-100 max-w-3xl shadow-lg px-6 py-6">
        {finished ?
          <div className="text-center">
            <div><button className="login-button bg-blue-600" onClick={() => reset()}>Go again</button></div>
            <b>Finished!</b>
            <p>Speed: {Math.round((quote.content.length / 5) / ((endTime - startTime) / 60000))} WPM</p>
            <p>Accuracy: {Math.round((quote.content.length - typos) / quote.content.length * 100)} %</p>
          </div>
        : 
        <>
          <p className="pb-4">
            <span className="text-correct">{typedCorrectBefore}</span>
            <span className="text-wrong">{typedWrongBefore}</span>
            <span className="whitespace-no-wrap">
              <span className="text-correct">{currentWordCorrect}</span>
              <span className="text-wrong">{currentWordWrong}</span>
              <span className="fake-caret">&nbsp;</span>
              <span>{currentWordNotTyped}</span>
            </span>
            <span className="text-wrong">{typedWrong}</span>
            <span>{notTyped}</span>
          </p>
          <input
            className={inputClassString}
            value={text}
            // suppressing React warning (caused by updating input value completely by hand)
            onChange={() => { return; }}
            onKeyPress={event => handleKeyPress(event)}
            onKeyDown={event => handleKeyDown(event)}
            maxLength={quote.content.length}
          />
        </>}
    </div>
  </div>
  );
};

export default TypingPage;