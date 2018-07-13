import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import App from './components/App.jsx';
import killerFeature from './helpers/killerFeature';

ReactDOM.render(<App />, document.getElementById('root'));

killerFeature();
