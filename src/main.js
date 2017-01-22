import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/index.js';
import App from './App.jsx';
import AboutPage from './components/AboutPage.jsx';
import InboxPage from './containers/InboxPage.jsx';

ReactDOM.render(
   <Provider store={store}>
      <Router history={hashHistory}>
         <Route path='/' component={App}>
            <Route path='/about' component={AboutPage} />
            <Route path='/inbox' component={InboxPage} />
         </Route>
      </Router>
   </Provider>,
   document.getElementById('mount-point')
);
