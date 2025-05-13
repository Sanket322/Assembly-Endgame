import { useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import Banner from './Components/banner';
import Keyboard from './Components/keyboard';
import {words} from "./Data/words"

function App() {
  const [currentWord, setcurrentWord] = useState(() =>getRandomcurrentWord())
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [status, setStatus] = useState("")

  console.log(status)

  function getRandomcurrentWord(){
    return words[Math.floor(Math.random() * words.length)];
  }

  function updatecurrentWord(){
    setcurrentWord(()=> getRandomcurrentWord())
    setFailedAttempts(0)
    setStatus("New Game")
  }

  return (
    <main>
      <Header />
      <Banner status={status} failedAttempts={failedAttempts }/>

      <section className='keyboard'>
        <Keyboard word={currentWord} setFailedAttempts={setFailedAttempts} failedAttempts={failedAttempts } setStatus={setStatus} status={status}/>
      </section>

      {
        status != "" && <button className='new-game' onClick={updatecurrentWord}>Try Again</button>
      }
    </main>
  );
}

export default App;
