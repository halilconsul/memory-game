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
      this.state = { isModalOpen: false, seconds: 0, countDown: 60 };
   }

   componentWillMount() {
      this.loadItems();
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
      this.clearInterval();
   }

   handleSubmit() {
      this.resetBoard();
      this.loadItems();
      this.handleQuestionModalClose();
      this.startTimer();
   }

   handleCancel() {
      this.handleQuestionModalClose()
      this.props.router.push('/about');
   }

   timer() {
      this.setState({ seconds: this.state.seconds + 1 });
      if (this.state.seconds == this.state.countDown) {
         this.handleQuestionModalOpen();
      }
   }

   loadItems() {
      this.props.ItemsActions.loadItems();
   }

   resetBoard() {
      this.props.ItemsActions.resetBoard();
   }

   handleCardClick(cardId) {
      this.props.ItemsActions.flipItem(cardId);
   }

   startTimer() {
      this.setState({ seconds: 0 });
      this.countDown = setInterval(this.timer.bind(this), 1000);
   }

   handleQuestionModalOpen() {
      this.setState({ isModalOpen: true });
      this.clearInterval();
   }

   handleQuestionModalClose() {
      this.setState({ isModalOpen: false });
      this.clearInterval();
   }

   clearInterval() {
      clearInterval(this.countDown);
   }

   allCardsFlipped() {
      const { totalCardsFlipped, items } = this.props;
      if (totalCardsFlipped === items.length) {
         return true;
      } else {
         return false;
      }
   }

   renderInboxPage() {
      return (
         <InboxPage
            items={this.props.items}
            seconds={this.state.seconds}
            countDown={this.state.countDown}
            isMatched={this.props.isMatched}
            gameMode={this.props.gameMode}
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
            allCardsFlipped={this.allCardsFlipped()}
         />
      );
   }

   render() {
      return (
         <div>
            {this.renderInboxPage()}
            {this.renderModal()}
         </div>
      );
   }
}

InboxPageContainer.propTypes = {
   items: React.PropTypes.array,
   selectedItemsId: React.PropTypes.array,
   isMatched: React.PropTypes.bool,
   router: React.PropTypes.object.isRequired,
   ItemsActions: React.PropTypes.object,
   numberOfMoves: React.PropTypes.number
}

function mapStateToProps(store) {
   return {
      items: store.board.items,
      selectedItems: getSelectedItems(store),
      isMatched: store.board.isMatched,
      numberOfMoves: store.board.numberOfMoves,
      gameMode: store.board.gameMode,
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
