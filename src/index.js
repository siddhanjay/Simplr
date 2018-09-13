import './polyfill'
import "bulma/css/bulma.css"
import "font-awesome/css/font-awesome.css"
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// disable ServiceWorker
// registerServiceWorker();
