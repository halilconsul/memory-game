import React from 'react';
import BoxItem from './BoxItem.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import './InboxPage.scss';

class InboxPage extends React.Component {
   renderBoxItems() {
      return (
         this.props.items.map(item =>
            <BoxItem
               key={item.id}
               isOpen={item.isFlipped}
               color={item.color}
               isMatched={this.props.isMatched}
               onCardCick={this.props.onCardCick.bind(null, item.id)}
            />
         )
      );
   }

   renderProgressBar() {
      return (
         <MuiThemeProvider>
            <LinearProgress
               mode='determinate'
               value={this.props.seconds}
               max={this.props.countDown}
            />
         </MuiThemeProvider>
      );
   }

   render() {
      const gameMode = `InboxPage__box InboxPage__box_${this.props.gameMode}`;
      return (
         <div className="InboxPage">
            <div className="InboxPage__progress">
               {this.renderProgressBar()}
            </div>
            <div className={gameMode}>
               {this.renderBoxItems()}
            </div>
         </div>
      );
   }
}

InboxPage.propTypes = {
   items: React.PropTypes.array,
   seconds: React.PropTypes.number,
   countDown: React.PropTypes.number,
   isMatched: React.PropTypes.bool,
   onCardCick: React.PropTypes.func,
   gameMode: React.PropTypes.string
}

export default InboxPage;
