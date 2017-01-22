import React from 'react';
import { withRouter, Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import './App.scss';

class App extends React.Component {
   redirectTo(route) {
      this.props.router.push(route)
   }

   render() {
      return (
         <div className="App">
            <MuiThemeProvider>
               <div className="App__nav">
                  <ul className="App__menu">
                     <li className="App__list">
                        <RaisedButton
                           label="About"
                           primary={true}
                           style={{margin: '12'}}
                           onClick={this.redirectTo.bind(this, '/about')}/>
                     </li>
                     <li className="App__list">
                        <RaisedButton
                           label="Start"
                           primary={true}
                           style={{margin: '12'}}
                           onClick={this.redirectTo.bind(this, '/inbox')}
                        />
                     </li>
                  </ul>
               </div>
            </MuiThemeProvider>
            <div className="App__children">
               {this.props.children}
            </div>
         </div>
      );
   }
}

export default withRouter(App);
