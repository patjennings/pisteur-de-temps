import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

import mainStore from "stores/mainStore";
import authStore from "stores/authStore";


import { observable, action, decorate } from "mobx";
import { Provider } from 'mobx-react';

import './index.scss';
import App from './screens/App/index';

// let store = new Store();
// console.log();
// store.getDefs();

// console.log(mainStore);


// console.log(mainStore);

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
    mainStore,
    authStore,
    routingStore
}

console.log(stores);

const history = syncHistoryWithStore(browserHistory, routingStore);

// console.log(customHistory);

ReactDOM.render(
    
    <Provider {...stores}>
      <Router history={history}>
	<App />
      </Router>
    </Provider>,
    
    document.getElementById('root')
);
