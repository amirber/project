import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from "./reportWebVitals";
import AppRouting from './route/App.route';

const renderDOM = () => ReactDOM.render(<AppRouting />, document.getElementById('root'));

renderDOM();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
