import Button from 'react-md/lib/Buttons/Button';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import logo from '../assets/images/ClinCentric_Cross.svg';
import '../assets/stylesheets/HomePage.scss';

class HomePage extends Component {
  constructor() {
    super();

    this.state = { checked: false };
  }

  componentDidMount() {
    const { currentUser, history, userRequest } = this.props;

    if (isEmpty(currentUser) && !userRequest) {
      history.push('/login');
    }
  }

  handleChange() {
    this.setState({
      checked: !this.state.checked,
    });
  }

  onSubmit() {
    const { currentUser, history } = this.props;

    history.push(`/users/${currentUser.id}/aps/new`);
  }

  render() {
    return (
      <div className="page-container">
        <Card className="home-page md-block-centered">
          <img role="presentation" src={logo} />
          <div className="home-page-content">
            <CardTitle
              className="home-page-title"
              title="Welcome to CliniCentric"
            />
            <CardText>
              <ul>
                <li>
                  You can use the CliniCentric application to retrieve medical history of an individual life Insurance applicant to assist you in insurance underwriting.
                </li>
                <br />
                <li>
                  Per HIPPA Data security rules, you must have prior applicant authorization for retrieving Protected Health Information(PHI).
                  You must upload user consent as proof of application authorization before you can initiate information retrieval.
                </li>
                <br />
                Before using CliniCentric application to initiate medical information records retrieval, please certify that you are the person that the system shows as logged in user.
              </ul>
              <span className="home-page-declare">
                <Checkbox
                  checked={this.state.checked}
                  className="checkbox"
                  defaultChecked
                  id="readDocumentationPage"
                  label="Declaration: I certify that I am the same person as indicated above by the system as 'logged in' user."
                  name="simpleCheckboxes"
                  onChange={() => this.handleChange()}
                />
              </span>
            </CardText>
          </div>
          <Button
            className="getStartedBtn md-block-centered"
            disabled={this.state.checked ? false : true}
            id="getStarted"
            label="Get Started"
            onClick={() => this.onSubmit()}
            raised
            secondary
          />
        </Card>
      </div>
    );
  }
}

HomePage.propTypes = {
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

export default connect(mapStateToProps)(HomePage);
