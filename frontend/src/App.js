import React, {useEffect, useState} from 'react'
import './App.css';

function App() {

  const [apiCall, setApiCall] = useState({})

  function callApi() {
    fetch("/api/get_text").then(response =>
      response.json().then(data =>
        setApiCall(data)
      )
    );
  }

  useEffect(() => {
    callApi()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        {apiCall.text}
        <br/ >
        <br/ >
        <br/ >
        <button onClick={callApi}>Click</button>
      </header>
    </div>
  );
}

export default App;
