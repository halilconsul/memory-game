import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

class QuestionModal extends React.Component {
   handleClose() {
      const { onClose } = this.props;
      if (onClose) {
         onClose();
      }
   }

   handleSubmit() {
      const { onSubmit } = this.props;
      if (onSubmit) {
         onSubmit();
      }
   }

   renderSuccess() {
      return (
         <div className="QuestionModal">
            <h4 className="QuestionModal__title">Well done!</h4>
            <p className="QuestionModal__text">You have made {this.props.numberOfMoves} moves.</p>
            <p className="QuestionModal__text">Wanna play one more time?</p>
         </div>
      );
   }

   renderFail() {
      return (
         <div className="QuestionModal">
            <h4 className="QuestionModal__title">Come on, you can do better!</h4>
            <p className="QuestionModal__text">Wanna try one more time?</p>
         </div>
      );
   }

   renderText() {
      if (this.props.allCardsFlipped) {
         return this.renderSuccess();
      } else {
         return this.renderFail()
      }
   }

   renderActionButtons() {
      const style = { margin: 12 };
      return [
         <RaisedButton
            label='No'
            onClick={this.handleClose.bind(this)}
            secondary={true}
            style={style}
         />,
         <RaisedButton
            primary={true}
            label='Yes'
            onClick={this.handleSubmit.bind(this)}
            style={style}
         />
      ]
   }

   render() {
      return (
         <MuiThemeProvider>
            <Dialog
               modal={true}
               contentStyle={{ maxWidth: 400 }}
               actions={this.renderActionButtons()}
               open={this.props.isOpen}
               onRequestClose={this.handleClose.bind(this)}
            >
               {this.renderText()}
            </Dialog>
         </MuiThemeProvider>
      );
   }
}

QuestionModal.propTypes = {
   isOpen: React.PropTypes.bool,
   onSubmit: React.PropTypes.func,
   onClose: React.PropTypes.func,
   numberOfMoves: React.PropTypes.number,
   allCardsFlipped: React.PropTypes.bool
}

export default QuestionModal;
