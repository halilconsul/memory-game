import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Nav from '../components/Nav.jsx';
import ItemsActions from '../actions/ItemsActions.js';

class NavConatiner extends React.Component {
   redirectTo(route) {
      this.props.router.push(route);
   }

   hendleLevelSelect({level}) {
      this.props.ItemsActions.selectGameMode(level);
   }

   render() {
      return (
         <Nav
            redirect={this.redirectTo.bind(this)}
            selectLevel={this.hendleLevelSelect.bind(this)}
            isGameOn={this.props.items.length === 0 ? false : true}
         />
      );
   }
}

NavConatiner.propTypes = {
   router: React.PropTypes.object.isRequired
}

function mapStateToProps(store) {
   return {
      items: store.board.items,
   }
}

function mapDispatchToProps(dispatch) {
   return {
      ItemsActions: bindActionCreators(ItemsActions, dispatch)
   }
}

const wrappedComponent = withRouter(NavConatiner);
export default connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
