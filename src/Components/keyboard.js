import { useEffect, useState } from "react";
import { clsx } from "clsx"
import { languages } from "../Data/language";

export default function Button(props) {
  function handleClick(event) {
    if(props.status != "") return;

    const character = event.target.textContent.toLowerCase();
    let isCharacterHighlighted = false;

    word.split("").forEach((element) => {
      if (element == character) {
        isCharacterHighlighted = true;
        setHighlightedCharacters((previous) => [...previous, character]);
        setHighlightedButtons((previous) => [...previous, character]);
      }
    });

    if (!isCharacterHighlighted && !excluded_buttons.includes(character)) {
      setExcludedButtons((previous) => [...previous, character]);
      props.setFailedAttempts((previous) => previous + 1);
    }
  }

  //code for a-z characters
  const [highlighted_buttons, setHighlightedButtons] = useState([]);
  const [excluded_buttons, setExcludedButtons] = useState([]);
  let buttons = [];
  for (let i = 65; i <= 90; i++) {
    buttons.push(String.fromCharCode(i));
  }

  buttons = buttons.map((button) => {
    const isCorrect = highlighted_buttons.includes(button)
    const isWrong = excluded_buttons.includes(button)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        onClick={handleClick}
      >
        {button}
      </button>
    );
  });

  //code to set the status
  useEffect(
    function () {
      if (highlighted_buttons.length === word.length) props.setStatus("Win");
      if (props.falied_attempts === languages.length) props.setStatus("Loose");
    },
    [highlighted_buttons, props.falied_attempts]
  );

  useEffect(function(){
    setExcludedButtons([])
    setHighlightedButtons([])
    setHighlightedCharacters([])
    props.setStatus("")
  }, [props.status== "New Game"])

  const word = props.word;
  const [highlightedCharacters, setHighlightedCharacters] = useState([]);
  const renderedCharacters = word.split("").map((char) => (
    <span className="characters">
      {highlightedCharacters.includes(char) ? char : ""}
    </span>
  ));

  return (
    <>
      <section className="word">{renderedCharacters}</section>
      <section className="keyboard">{buttons}</section>
    </>
  );
}
