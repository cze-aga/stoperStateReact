import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux'; 
import * as ReactRedux from 'react-redux';

//function from state to the set of props
function mapStateToProps (state)
{
  return state;
}

//funciton from dispatch to props
//that is where we need to map our events that we want 
//our component to be able to raise to dispatch the props
function mapDispatchToProps(dispatch) {
  return {
    onStart: () => { dispatch({type: 'START'}); },
    onStop: () => { dispatch({type: 'STOP'}); },
  };
}


//by definition view is React component
//it can be wrapped in the connect function for React-redux
//connect returns another function and that function takes the React component 
//as the argument
let StopWatch = ReactRedux.connect(mapStateToProps, mapDispatchToProps)((props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - (minutes * 60);
  let secondsFormatted =  `${seconds < 10 ? '0' : ''}${seconds}`;
  
  return <div>
    <p>{minutes}:{secondsFormatted}</p>
      <button onClick={props.running ? props.onStop : props.onStart}>{props.running ? 'Stop' : 'Start'}</button>
  </div>;
});


// let intents = {
//   TICK: 'TICK', //produced by environment
//   START: 'START',
//   STOP: 'STOP',
//   RESET: 'RESET'
// };


// const createStore = (reducer) => {
//   let internalState;
//   let handlers = [];
//   return{
//     dispatch: (intent) => {
//       internalState = reducer(internalState, intent);
//       handlers.forEach(h=> h());
//     },
//     subscribe: (handler) => {
//       handlers.push(handler);
//     },
//     getState: () => internalState,
//   };
// };


const update = (model = { running: false, time: 0}, intent) => {
  const actions = {
    'START': (model) => Object.assign({}, model, {running: true}),
    'STOP': (model) => Object.assign({}, model, {running: false}),
    'TICK': (model) => Object.assign({}, model, {time: model.time + (model.running ? 1 : 0)})
  };
  return (actions[intent.type] || (() => model))(model);
}


//custom state container
//create store - to create application state container
let container = Redux.createStore(update);

//subsscribe the callback function to be called when 
//the model changes

  ReactDOM.render(
    <ReactRedux.Provider store={container}>
      <StopWatch/>
    </ReactRedux.Provider>
    ,
    document.getElementById('root'));

// container.subscribe(render);


setInterval(() => {
  container.dispatch({type:'TICK'});
}, 1000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
