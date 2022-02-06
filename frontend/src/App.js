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
  const [userClicked, setUserClicked] = useState(false)
  const [userResponse, setUserResponse] = useState(null)

  useEffect(() => {
    callApi(setTweet1)
    callApi(setTweet2)
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        {userClicked ? 
          <div>User won: {userResponse ? "yes!" : "no :("}</div>
          :
          <div>User hasn't clicked yet.</div>
        }
        <br />
        <br />
        <Panel text={tweet1.text} clickHandler={() => {
          setUserClicked(true);
          setUserResponse(tweet1.favorites > tweet2.favorites);
        }}/>
        <br />
        <br />
        <Panel text={tweet2.text} clickHandler={() => {
          setUserClicked(true);
          setUserResponse(tweet2.favorites > tweet1.favorites);
        }}/>
      </header>
    </div>
  );
}

export default App;
