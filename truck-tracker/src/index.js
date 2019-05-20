import React from 'react';
import ReactDOM from 'react-dom';
import Routing from './Scripts/routing';
import Authentication from './Scripts/authentication';

const auth = new Authentication();

ReactDOM.render(<Routing authentication={auth} />, document.getElementById('root'));