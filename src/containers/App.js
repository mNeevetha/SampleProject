import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router';

import FlashMessages from './FlashMessages';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { logoutUser } from '../store/auth/actions.js';
import Header from '../components/Header';
import QueryPage from './APSQueryPage';
import APSRequestHistory from './APSRequestHistory';

import '../assets/stylesheets/App.scss';

class App extends Component {
  logout() {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render() {
    return (
      <div className="app">
        <Header
          currentUser={this.props.currentUser}
          logout={() => this.logout()}
        />
        <FlashMessages />
        <div className="app__content">
          <Route component={HomePage} exact path="/" />
          <Route component={LoginPage} path="/login" />
          <Route component={QueryPage} path="/users/:user_id/aps" />
          <Route component={APSRequestHistory} path="/users/:user_id/history" />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    currentUser: state.user.currentUser,
  };
}

export default withRouter(connect(mapStateToProps)(App));
