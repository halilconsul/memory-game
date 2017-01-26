import React from 'react';
import { withRouter, Link } from 'react-router';
import Nav from './containers/Nav.jsx';
import './App.scss';

class App extends React.Component {
   render() {
      return (
         <div className="App">
            <div className="App__nav">
               <Nav />
            </div>
            <div className="App__children">
               {this.props.children}
            </div>
         </div>
      );
   }
}

export default withRouter(App);
