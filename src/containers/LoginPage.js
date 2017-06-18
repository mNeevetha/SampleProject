import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';
import { loginUser } from '../store/auth/actions.js';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(fieldType, value) {
    this.setState({ [fieldType]: value });
  }

  handleLogin(e) {
    e.preventDefault();

    const { email, password } = this.state;
    const creds = { email, password };

    return this.props.dispatch(loginUser(creds, this.props.history));
  }

  render() {
    return (
      <LoginForm
        email={this.state.email}
        handleChange={(fieldType, value) => this.handleChange(fieldType, value)}
        onSubmit={e => this.handleLogin(e)}
        password={this.state.password}
      />
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default connect()(LoginPage);
