import PropTypes from 'prop-types';
import React, { Component } from 'react';

class FlashMessage extends Component {
  componentWillMount() {
    const { removeMessage } = this.props;

    this.slideMessageUp();

    setTimeout(() => {
      removeMessage();
    }, 3000);
  }

  slideMessageUp() {
    const { triggerSlideUp } = this.props;

    setTimeout(() => {
      triggerSlideUp();
    }, 2000);
  }

  render() {
    const { message } = this.props;

    return (
      <div className="flash-messages__text">
        {message}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.string,
  removeMessage: PropTypes.func,
  triggerSlideUp: PropTypes.func,
};

export default FlashMessage;
