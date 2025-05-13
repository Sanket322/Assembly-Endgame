import { useState } from 'react';
import './App.css';
import Header from "./Components/Header";
import Banner from './Components/banner';
import Keyboard from './Components/keyboard';
import {words} from "./Data/words"

function App() {
  const [currentWord, setCurrentcurrentWord] = useState("bottle")
  const [falied_attempts, setFailedAttempts] = useState(0)
  const [status, setStatus] = useState("")

  function getRandomcurrentWord(){
    return words[Math.floor(Math.random() * words.length)];
  }

  function updatecurrentWord(){
    setCurrentcurrentWord(()=> getRandomcurrentWord())
    setFailedAttempts(0)
    setStatus("New Game")
  }

  return (
    <main>
      <Header />
      <Banner status={status} falied_attempts={falied_attempts}/>

      <section className='keyboard'>
        <Keyboard word={currentWord} setFailedAttempts={setFailedAttempts} falied_attempts={falied_attempts} setStatus={setStatus} status={status}/>
      </section>

      {
        status != "" && <button className='new-game' onClick={updatecurrentWord}>Try Again</button>
      }
    </main>
  );
}

export default App;
