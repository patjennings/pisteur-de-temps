import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, hashHistory } from "react-router-dom";

import mainStore from "stores/mainStore";

import { observable, action, decorate } from "mobx";
import { Provider } from 'mobx-react';

import './index.scss';
import App from './screens/App/index';

// let store = new Store();
// console.log();
// store.getDefs();

// console.log(mainStore);


// console.log(mainStore);

const stores = {
    mainStore
}

ReactDOM.render(
    <Router history={hashHistory}>
      <Provider {...stores}>
	<App />
      </Provider>
    </Router>,
    
    document.getElementById('root')
);
