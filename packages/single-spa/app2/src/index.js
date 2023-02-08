import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));

let root = null

function render(props) {
  console.log(props, 'props')
  const container = props?.container ? document.querySelector(props.container) : document.getElementById('root')
  if(!container) return
  root = ReactDOM.createRoot(container)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

if(!window.app2) {
  render()
}

export const bootstrap = () => {
  return Promise.resolve()
}

export const mount = (props) => {
  render(props)
  return Promise.resolve()
}

export const unmount = () => {
  root.unmount()
  return Promise.resolve()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
