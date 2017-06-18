import isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Dialog from 'react-md/lib/Dialogs';
import FontIcon from 'react-md/lib/FontIcons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import APSAdvanceQueryForm from '../components/APSAdvanceQueryForm';
import APSQueryForm from '../components/APSQueryForm';

import { applicantDiscovery } from '../store/apsQuery/actions.js';
import '../assets/stylesheets/APSQueryPage.scss';

export class APSQueryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDate: '',
      fileName: '',
      firstName: '',
      gender: '',
      lastName: '',
      lastSSN: '',
      middleName: '',
      phoneNumber: '',
      visible: false,
      zipCode: '',
    };
  }

  componentDidMount() {
    const { currentUser, history, userRequest } = this.props;

    if (isEmpty(currentUser) && !userRequest) {
      history.push('/login');
    }
  }

  displayButton() {
    const { applicantDocuments, requestError } = this.props.apsQuery;
    const actions = [];

    if (applicantDocuments.length > 0) {
      return actions.concat([
        {
          className: 'success',
          onClick: this.handleCloseDialog.bind(this),
          primary: true,
          label: 'Continue',
        },
      ]);
    } else if (requestError) {
      return actions.concat([
        {
          className: 'error',
          onClick: this.handleCloseDialog.bind(this),
          primary: true,
          label: 'Refine search',
        },
      ]);
    } else {
      return actions.concat([{}]);
    }
  }

  formatDOB(fieldType, value) {
    value = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD');
    this.setState({ [fieldType]: value });
  }

  handleCloseDialog() {
    const { currentUser, history } = this.props;

    history.push(`/users/${currentUser.id}/aps/refine-search`);
    this.setState({ visible: false });
  }

  handleChange(fieldType, value) {
    this.setState({ [fieldType]: value });
  }

  requestProgressStatus(requestType) {
    //length of the array/string > 0 stands in for success of reques (e.g. an applicantPatientId longer than an empty string means success)
    if (this.props.apsQuery[requestType].length > 0) {
      return 'request-progress_status success';
    } else {
      return 'request-progress_status';
    }
  }

  showProgressIcon() {
    const { applicantDocuments, requestError } = this.props.apsQuery;

    if (applicantDocuments.length > 0) {
      return (
        <FontIcon className="request-progress_icon success">
          check_circle
        </FontIcon>
      );
    } else if (requestError) {
      return (
        <FontIcon className="request-progress_icon failure">
          error_outline
        </FontIcon>
      );
    } else {
      return <CircularProgress id="circularProgress" scale={3} />;
    }
  }

  submitForm(e) {
    e.preventDefault();
    const {
      birthDate,
      firstName,
      gender,
      lastName,
      lastSSN,
      middleName,
      phoneNumber,
      zipCode,
    } = this.state;
    const data = {
      birthDate,
      firstName,
      gender,
      lastName,
      lastSSN,
      middleName,
      phoneNumber,
      zipCode,
    };
    this.props.dispatch(
      applicantDiscovery(
        data,
        this.props.history,
        this.props.currentUser,
        this.props.queryId
      )
    );
    this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/users/:user_id/aps/new"
            render={routeProps => (
              <APSQueryForm
                {...routeProps}
                birthDate={this.state.birthDate}
                fileName={this.state.fileName}
                firstName={this.state.firstName}
                formatDOB={(fieldType, value) =>
                  this.formatDOB(fieldType, value)}
                gender={this.state.gender}
                handleChange={(fieldType, value) =>
                  this.handleChange(fieldType, value)}
                lastName={this.state.lastName}
                onSubmit={e => this.submitForm(e)}
              />
            )}
          />
          <Route
            exact
            path="/users/:user_id/aps/refine-search"
            render={routeProps => (
              <APSAdvanceQueryForm
                {...routeProps}
                birthDate={this.state.birthDate}
                firstName={this.state.firstName}
                formatDOB={(fieldType, value) =>
                  this.formatDOB(fieldType, value)}
                gender={this.state.gender}
                handleChange={(fieldType, value) =>
                  this.handleChange(fieldType, value)}
                lastName={this.state.lastName}
                lastSSN={this.state.lastSSN}
                middleName={this.state.middleName}
                onSubmit={e => this.submitForm(e)}
                phoneNumber={this.state.phoneNumber}
                queryId={this.props.queryId}
                zipCode={this.state.zipCode}
              />
            )}
          />
        </Switch>
        <Dialog
          actions={this.displayButton()}
          className="request-progress_dialog"
          focusOnMount={false}
          id="apsRequestDialog"
          modal
          onHide={this.handleCloseDialog}
          title="Request Progress"
          visible={visible}
        >
          <div>
            {this.showProgressIcon()}
            <div className="request-progress">
              <div className="request-progress_line" />
              <div
                className={this.requestProgressStatus('applicantPatientId')}
              />
              <div className="request-progress_line" />
              <div
                className={this.requestProgressStatus('applicantDocumentIds')}
              />
              <div className="request-progress_line" />
              <div
                className={this.requestProgressStatus('applicantDocuments')}
              />
              <div className="request-progress_line" />
            </div>
            <p className="request-progress_message">
              {this.props.apsQuery.apsQueryMessage}
            </p>
          </div>
        </Dialog>
      </div>
    );
  }
}

APSQueryPage.propTypes = {
  apsQuery: PropTypes.object,
  currentUser: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
  queryId: PropTypes.number,
  userRequest: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    apsQuery: state.apsQuery,
    currentUser: state.user.currentUser,
    queryId: state.apsQueryRecord.queryId,
    userRequest: state.user.userRequest,
  };
}

export default connect(mapStateToProps)(APSQueryPage);
