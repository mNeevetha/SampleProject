import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Paper from 'react-md/lib/Papers';
import TextField from 'react-md/lib/TextFields';

import {
  validateInitial,
  validatePhone,
  validateSSN,
  validateZip,
} from '../utils/inputValidations';

import '../assets/stylesheets/APSQueryForm.scss';
import '../assets/stylesheets/APSAdvanceQueryForm.scss';

const APSAdvanceQueryForm = ({
  birthDate,
  firstName,
  formatDOB,
  gender,
  handleChange,
  lastName,
  lastSSN,
  match,
  middleName,
  onSubmit,
  phoneNumber,
  queryId,
  zipCode,
}) => {
  if (!queryId) {
    return <Redirect to={`/users/${match.params.user_id}/aps/new`} />;
  }

  const validateSearchQuery = (lastSSN, middleName, phoneNumber, zipCode) => {
    if (middleName || lastSSN || phoneNumber || zipCode) {
      return validateInitial(middleName) ||
        validateSSN(lastSSN) ||
        validatePhone(phoneNumber) ||
        validateZip(zipCode)
        ? true
        : false;
    } else {
      return false;
    }
  };

  const searchValid = () => {
    return validateSearchQuery(lastSSN, middleName, phoneNumber, zipCode);
  };

  return (
    <div className="page-container">
      <Paper className="query-form md-block-centered" zDepth={0}>
        <div>
          <h2 className="query-form_title">
            Applicant Search Refinement
            <span className="md-caption">
              *PROVIDE AT LEAST ONE ADDITIONAL INPUT
            </span>
          </h2>
        </div>
        <form className="query-form__fields md-grid">
          <TextField
            className="md-cell md-cell--5 advance-form_firstName"
            defaultValue={firstName}
            disabled
            id="firstName"
            type="text"
          />
          <TextField
            className="md-cell md-cell--2 advance-form_middleName"
            error={middleName ? !validateInitial(middleName) : false}
            errorText="Middle intial must be a single letter"
            id="middleName"
            onChange={value => handleChange('middleName', value)}
            placeholder="Middle Intial"
            type="text"
            value={middleName}
          />
          <TextField
            className="md-cell md-cell--5 advance-form_lastName"
            defaultValue={lastName}
            disabled
            id="lastName"
            type="text"
          />
          <TextField
            className="advance-form_gender md-cell md-cell--3"
            defaultValue={gender}
            disabled
            id="gender"
          />
          <DatePicker
            className="advance-form_date-of-birth md-cell md-cell--3"
            defaultValue={birthDate}
            disabled
            helpText="DD/MM/YYYY"
            id="birthDate"
            lineDirection="center"
            yearsDisplayed={234}
          />
          <TextField
            className="md-cell md-cell--5 advance-form_phoneNumber"
            error={phoneNumber ? !validatePhone(phoneNumber) : false}
            errorText="Use format ###-###-####"
            helpText="###-###-####"
            id="phoneNumber"
            onChange={value => handleChange('phoneNumber', value)}
            placeholder="Primary Phone Number"
            type="text"
            value={phoneNumber}
          />
          <TextField
            className="md-cell md-cell--2 advance-form_zipCode"
            error={zipCode ? !validateZip(zipCode) : false}
            helpText="#####"
            id="zipCode"
            onChange={value => handleChange('zipCode', value)}
            placeholder="Zip Code"
            type="text"
            value={zipCode}
          />
          <TextField
            className="md-cell md-cell--2 advance-form_lastSSN"
            error={lastSSN ? !validateSSN(lastSSN) : false}
            helpText="####"
            id="lastSSN"
            onChange={value => handleChange('lastSSN', value)}
            placeholder="Last 4 digits of SSN"
            type="text"
            value={lastSSN}
          />
          <div className="query-form_submit md-cell md-cell--12">
            <Button
              disabled={!searchValid()}
              id="submitQuery"
              label="Submit Applicant Info"
              onClick={onSubmit}
              raised
              secondary
            />
          </div>
        </form>
      </Paper>
    </div>
  );
};

APSAdvanceQueryForm.propTypes = {
  birthDate: PropTypes.string,
  firstName: PropTypes.string,
  formatDOB: PropTypes.func,
  gender: PropTypes.string,
  handleChange: PropTypes.func,
  lastName: PropTypes.string,
  lastSSN: PropTypes.string,
  match: PropTypes.object,
  middleName: PropTypes.string,
  onSubmit: PropTypes.func,
  phoneNumber: PropTypes.string,
  queryId: PropTypes.number,
  zipCode: PropTypes.string,
};

export default APSAdvanceQueryForm;
