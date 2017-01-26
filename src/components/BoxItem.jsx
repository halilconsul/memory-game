import React from 'react';
import './BoxItem.scss';

class BoxItem extends React.Component {
   handleCardClick() {
      if (!this.props.isOpen && this.props.isMatched) {
         this.props.onCardCick();
      }
   }

   render() {
      const { isOpen, color, onCardCick } = this.props;
      const isFlipped = isOpen ? 'BoxItem cardFlipped' : 'BoxItem';
      const style = { backgroundColor: isOpen ? color : '' };
      return (
         <div
            className={isFlipped}
            style={style}
            onClick={this.handleCardClick.bind(this)}
         >
         </div>
      );
   }
}

BoxItem.propTypes = {
   isOpen: React.PropTypes.bool,
   color: React.PropTypes.string,
   isMatched: React.PropTypes.bool,
   onCardCick: React.PropTypes.func
}

export default BoxItem;
