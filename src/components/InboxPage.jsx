import React from 'react';
import BoxItem from './BoxItem.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LinearProgress from 'material-ui/LinearProgress';
import './InboxPage.scss';

const InboxPage = props => (
   <div className="InboxPage">
      <div className="InboxPage__progress">
         <MuiThemeProvider>
            <LinearProgress mode='determinate' style={{height: '3px', backgroundColor: '#3FCAB4'}} color='#FFA89F' value={props.seconds} max={props.countDown - .5}/>
         </MuiThemeProvider>
      </div>
      <div className="InboxPage__box">
         {
            props.items.map(item =>
               <BoxItem
                  key={item.id}
                  isOpen={item.isFlipped}
                  color={item.color}
                  isMatched={props.isMatched}
                  onCardCick={props.onCardCick.bind(null, item.id)}
               />
            )
         }
      </div>
   </div>
);

InboxPage.propTypes = {
   items: React.PropTypes.array,
   seconds: React.PropTypes.number,
   countDown: React.PropTypes.number,
   isMatched: React.PropTypes.bool,
   onCardCick: React.PropTypes.func
}

export default InboxPage;
