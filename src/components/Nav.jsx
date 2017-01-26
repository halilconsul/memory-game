import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import './Nav.scss';

class Nav extends React.Component {
   handleClick(e) {
      this.props.selectLevel({
         level: e.target.value
      });
   }

   renderRadioButtons() {
      return (
         <div className="Nav__clickers">
            <h4 className="Nav__radioTitle">Difficulty</h4>
            <RadioButtonGroup
               name="shipSpeed"
               defaultSelected="normal"
               className="Nav_radioButtons"
            >
               <RadioButton
                 value="normal"
                 label="Normal"
                 onClick={this.handleClick.bind(this)}
                 className="Nav_radio"
                 disabled={this.props.isGameOn}
               />
               <RadioButton
                 value="hard"
                 label="Hard"
                 onClick={this.handleClick.bind(this)}
                 className="Nav_radio"
                 disabled={this.props.isGameOn}
               />
             </RadioButtonGroup>
         </div>
      );
   }

   // renderRadioButtons() {
   //    return (
   //       <div>
   //          <label><input
   //             type="radio"
   //             name="difficulty"
   //             value="normal"
   //             defaultChecked={true}
   //             onClick={this.handleClick.bind(this)}
   //          />Normal</label>
   //          <label><input
   //             type="radio"
   //             name="difficulty"
   //             value="hard"
   //             onClick={this.handleClick.bind(this)}
   //          />Hard</label>
   //       </div>
   //    );
   // }

   renderMenuButtons() {
      return (
         <ul className="Nav__menu">
            <li className="Nav__list">
               <RaisedButton
                  label="About"
                  primary={true}
                  style={{margin: '12'}}
                  onClick={this.props.redirect.bind(this, '/about')}
               />
            </li>
            <li className="Nav__list">
               <RaisedButton
                  label="Start"
                  primary={true}
                  style={{margin: '12'}}
                  onClick={this.props.redirect.bind(this, '/inbox')}
                  disabled={this.props.isGameOn}
               />
            </li>
         </ul>
      );
   }

   render() {
      return (
         <MuiThemeProvider>
            <div className="Nav">
               {this.renderMenuButtons()}
               {this.renderRadioButtons()}
            </div>
         </MuiThemeProvider>
      );
   }
}

Nav.propTypes = {
   redirect: React.PropTypes.func,
   selectLevel: React.PropTypes.func,
   isGameOn: React.PropTypes.bool
}

export default Nav;
