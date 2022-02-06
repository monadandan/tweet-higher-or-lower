import React from 'react'
import '../App.css';

function Panel(props) {

  return (
    <div className="Panel">
        {props.text}
        <br/ >
        <br/ >
        <br/ >
        <button onClick={props.clickHandler}>Click</button>
    </div>
  );
}

export default Panel;
