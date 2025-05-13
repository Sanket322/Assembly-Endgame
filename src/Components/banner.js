import { languages } from "../Data/language";

export default function banner(props) {
  const language = languages.map((language, index) => (
    <span
      style={{
        color: "white",
        textDecoration: index < props.failedAttempts ? "line-through" : "none",
        opacity: index < props.failedAttempts ? 0.5 : 1,
        background: language.backgroundColor,
        color: language.color,
      }}
    >
      {language.name}
    </span>
  ));

  const renderStatus = function(){
    if (props.status === "Win") {
      return (
        <>
          <h2>You Won!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else if(props.status === "Lose") {
      return (
        <>
          <h2>You Lose!</h2>
          <p>Better start learning Assembly</p>
        </>
      );
    }
  };

  const game_status_background = () => {
    if(props.status === "Win"){
       return "#10A95B"
    }else if(props.status === "Lose"){
      return "#BA2A2A"
    }
    return null
  }

  return (
    <>
      <section
        className="game_status"
        style={{ background: game_status_background()}}
      >
        {renderStatus()}
      </section>
      <section className="language-chips">{language}</section>
    </>
  );
}
