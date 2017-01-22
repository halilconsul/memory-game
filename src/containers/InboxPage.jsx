import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import ItemsActions from '../actions/ItemsActions.js';
import InboxPage from '../components/InboxPage.jsx';
import getSelectedItems from '../selectors/selectedCards.js';
import totalCardsFlipped from '../selectors/totalCardsFlipped.js';
import QuestionModal from '../components/QuestionModal.jsx';

class InboxPageContainer extends React.Component {
   constructor() {
      super();
      this.state = { isModalOpen: false, seconds: 0, countDown: 15 };
   }

   componentWillMount() {
      this.props.ItemsActions.loadItems();
   }

   componentDidMount() {
      this.startTimer();
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.selectedItems.length === 2) {
         this.props.ItemsActions.compareSelectedItems(nextProps.selectedItems);
      }
      if (!nextProps.isMatched) {
         setTimeout(() => this.props.ItemsActions.turnItemsBack(), 500) ;
      }
      if (nextProps.totalCardsFlipped === nextProps.items.length) {
         this.handleQuestionModalOpen();
      }
   }

   componentWillUnmount() {
      this.resetBoard();
      clearInterval(this.countDown);
   }

   timer() {
      this.setState({ seconds: this.state.seconds + 1 });
      if (this.state.seconds == this.state.countDown) {
         this.handleQuestionModalOpen();
      }
   }

   resetBoard() {
      this.props.ItemsActions.resetBoard();
   }

   handleCardClick(cardId) {
      this.props.ItemsActions.flipItem(cardId);
   }

   handleSubmit() {
      this.resetBoard();
      this.handleQuestionModalClose();
      this.startTimer();
   }

   startTimer() {
      this.setState({ seconds: 0 });
      this.countDown = setInterval(this.timer.bind(this), 1000);
   }

   handleQuestionModalOpen() {
      this.setState({ isModalOpen: true });
      clearInterval(this.countDown);
   }

   handleQuestionModalClose() {
      this.setState({ isModalOpen: false });
      clearInterval(this.countDown);
   }

   handleCancel() {
      this.handleQuestionModalClose()
      this.props.router.push('/about');
   }

   renderInboxPage() {
      return (
         <InboxPage
            items={this.props.items}
            seconds={this.state.seconds}
            countDown={this.state.countDown}
            isMatched={this.props.isMatched}
            onCardCick={this.handleCardClick.bind(this)}
         />
      );
   }

   renderModal() {
      return (
         <QuestionModal
            isOpen={this.state.isModalOpen}
            onSubmit={this.handleSubmit.bind(this)}
            onClose={this.handleCancel.bind(this)}
            numberOfMoves={this.props.numberOfMoves}
            allCardsFlipped={this.props.totalCardsFlipped === this.props.items.length ? true : false}
         />
      );
   }

   render() {
      return (
         <div>
            {this.renderInboxPage()}
            {this.renderModal()}
         </div>
      )
   }
}

InboxPageContainer.propTypes = {
   items: React.PropTypes.array,
   selectedItemsId: React.PropTypes.array,
   isMatched: React.PropTypes.bool,
   ItemsActions: React.PropTypes.object,
   numberOfMoves: React.PropTypes.number
}

function mapStateToProps(store) {
   return {
      items: store.items.items,
      selectedItems: getSelectedItems(store),
      isMatched: store.items.isMatched,
      numberOfMoves: store.items.numberOfMoves,
      totalCardsFlipped: totalCardsFlipped(store)
   }
}

function mapDispatchToProps(dispatch) {
   return {
      ItemsActions: bindActionCreators(ItemsActions, dispatch)
   }
}

const wrappedComponent = withRouter(InboxPageContainer);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);