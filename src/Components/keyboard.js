import { useEffect, useState } from "react";
import { languages } from "../Data/language";

export default function Button(props) {
  const word = props.word;
  const [highlightedCharacters, setHighlightedCharacters] = useState(new Set());
  const [excludedButtons, setExcludedButtons] = useState(new Set());

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i).toLowerCase()
  );

  function handleClick(event) {
    if (props.status != "") return;

    const character = event.target.textContent.toLowerCase();
    if (highlightedCharacters.has(character) || excludedButtons.has(character))
      return;
    let isCharacterHighlighted = false;

    if (word.includes(character)) {
      isCharacterHighlighted = true;
      setHighlightedCharacters((previous) =>  new Set(previous).add(character));
    } else {
      setExcludedButtons((previous) => new Set(previous).add(character));
      props.setFailedAttempts((previous) => previous + 1);
    }
  }

  //code for a-z characters
  function renderButtons() {
    return alphabet.map((char) => {
      const isCorrect = highlightedCharacters.has(char);
      const isWrong = excludedButtons.has(char);
      const style = isCorrect ? "#10A95B" : (isWrong ? "#EC5D49" : "") 

      return (
        <button
          key={char}
          style={{background : style}}
          onClick={handleClick}
        >
          {char}
        </button>
      );
    });
  }

  useEffect(() => {
    if (highlightedCharacters.size === word.length) props.setStatus("Win");
    if (props.failedAttempts >= languages.length) props.setStatus("Lose");

  }, [highlightedCharacters, props.failedAttempts]);

  useEffect(() => {
    if (props.status === "New Game") {
      setHighlightedCharacters(new Set());
      setExcludedButtons(new Set());
      props.setStatus("")
    }
  }, [props.status]);

  const renderedCharacters = word.split("").map((char, index) => (
    <span key={index} className="characters">
      {highlightedCharacters.has(char) ? char : ""}
    </span>
  ));

  return (
    <>
      <section className="word">{renderedCharacters}</section>
      <section className="keyboard">{renderButtons()}</section>
    </>
  );
}
