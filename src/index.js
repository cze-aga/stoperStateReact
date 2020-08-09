import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


let model = {
  running: false,
  time: 0
};

let view = (m) => 
{
  let minutes = Math.floor(m.time /60);
  let seconds = m.time - (minutes * 60);
  let secondsFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
  let handler = (event) => 
  {
    model = update(model, m.running ? 'STOP' : 'START');
  }
  
  return <div>
    <p>{minutes}:{secondsFormatted}</p>
    <button onClick={handler}>{m.running ? 'STOP' : 'START'}</button>
    </div>;
};

// let intents = {
//   TICK: 'TICK', //produced by environment
//   START: 'START',
//   STOP: 'STOP',
//   RESET: 'RESET'
// };

const update = (model, intent) => {
  const actions = {
    'START': (model) => Object.assign(model, {running: true}),
    'STOP': (model) => Object.assign(model, {running: false}),
    'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 1 : 0)})
  };
  return actions[intent](model);
}

const render = () => {
  ReactDOM.render(
    view(model),
    document.getElementById('root')
  );
};
render();

setInterval(() => {
  model = update(model, 'TICK');
  render();
}, 1000);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
