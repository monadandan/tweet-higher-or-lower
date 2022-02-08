import React, {useEffect, useState} from 'react'
import './App.css';
import Panel from './Components/Panel'

function callApi(setApiCall) {
  fetch("/twitter_api/get_tweet").then(response =>
    response.json().then(data =>
      setApiCall(data)
    )
  );
}

function App() {

  const [tweet1, setTweet1] = useState({})
  const [tweet2, setTweet2] = useState({})
  const [currentStreak, setCurrentStreak] = useState(0)
  const [lastStreak, setLastStreak] = useState(0);

  useEffect(() => {
    callApi(setTweet1)
    callApi(setTweet2)
  }, [])

  function winLogic(setTweet) {
    callApi(setTweet);
    setCurrentStreak(x => x+1);
  }

  function loseLogic() {
    callApi(setTweet1);
    callApi(setTweet2);
    setLastStreak(currentStreak);
    setCurrentStreak(0);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        {currentStreak > 0 ? 
          <div>Nice job, your streak is at {currentStreak}. Keep going!</div>
          :
          <div>
            {lastStreak > 0 ?
              <div>Awww :( You lost at a streak of {lastStreak}</div>
              :
              <div></div>
            }
            <div>Which tweet do you think got more favorites?</div>
          </div>
        }
        <br />
        <br />
        <Panel text={tweet1.text} clickHandler={() => {
          tweet1.favorites >= tweet2.favorites ? winLogic(setTweet2) : loseLogic();
        }}/>
        <br />
        <br />
        <Panel text={tweet2.text} clickHandler={() => {
          tweet2.favorites >= tweet1.favorites ? winLogic(setTweet1) : loseLogic();
        }}/>
      </header>
    </div>
  );
}

export default App;
