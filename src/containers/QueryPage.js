import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import QueryForm from '../components/QueryForm';


class QueryPage extends Component {

    componentDidMount() {
    const { currentUser, history, userRequest } = this.props;

    if (isEmpty(currentUser) && !userRequest) {
      history.push('/login');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName:'',
      lastName:'',
      gender:'',
    };
  }

  handleChange(fieldType, value) {
    this.setState({ [fieldType]: value });
  }

  render() {
    return (
      <QueryForm
        firstName={this.state.firstName}
        middleName={this.state.middleName}
        lastName={this.state.lastName}
        handleChange={(fieldType, value) => this.handleChange(fieldType, value)}
      />
    );
  }
}

QueryPage.propTypes = {
  currentUser: PropTypes.object,
  history: PropTypes.object,
  userRequest: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
    userRequest: state.user.userRequest,
  };
}

export default connect(mapStateToProps)(QueryPage);
