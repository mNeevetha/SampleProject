import PropTypes from 'prop-types';
import React from 'react';

import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import Paper from 'react-md/lib/Papers';
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';

import ProofOfConsent from './ProofOfConsent';
import { validateNames, validateDOB } from '../utils/inputValidations';

import '../assets/stylesheets/APSQueryForm.scss';

const APSQueryForm = ({
  birthDate,
  fileName,
  firstName,
  formatDOB,
  gender,
  handleChange,
  lastName,
  onSubmit,
}) => {
  const validateFileUpload = function(fileName) {
    return fileName ? true : false;
  };

  const validateSearchQuery = (firstName, lastName, birthDate, fileName) => {
    return validateNames(firstName) &&
      validateNames(lastName) &&
      validateDOB(birthDate) &&
      validateFileUpload(fileName)
      ? true
      : false;
  };

  const searchValid = () => {
    return validateSearchQuery(firstName, lastName, birthDate, fileName);
  };

  const genderList = ['male', 'female'];

  return (
    <div className="page-container">
      <Paper className="query-form md-block-centered" zDepth={0}>
        <div>
          <h2 className="query-form_title">
            Applicant Search
            <span className="md-caption">*REQUIRED FIELDS</span>
          </h2>
        </div>
        <div className="query-form__upload-file">
          <ProofOfConsent handleChange={handleChange} />
        </div>
        <div>
          <p className="query-form_declaration md-text-justify">
            <span className="md-font-bold">Declaration: </span>
            <span>
              By executing the below search query I confirm that I am duly
              authorized as per HIPPA privacy requirements to search and
              retrieve medical records pertaining to the individual mentioned in
              the query below. I am uploading a digital copy of the informed
              consent from the applicant to search and retrieve medical records,
              in digital format, of all natural including but not limited to,
              any and all medical reports, physician notes, tests, tests
              results, diagnosis, clinic records, corresponding to the
              applicant. I also confirm that I am NOT searching or retrieving
              medical records for anyone other than the applicant who has
              applied for insurance coverage and the information retrieved will
              be only used for insurance related purposes.
            </span>
          </p>
        </div>
        <form className="query-form__fields md-grid">
          <TextField
            className="md-cell md-cell--6 query-form_firstName"
            error={firstName ? !validateNames(firstName) : false}
            errorText="First Name is required"
            id="firstName"
            onChange={value => handleChange('firstName', value)}
            placeholder="First Name"
            required
            type="text"
            value={firstName}
          />
          <TextField
            className="md-cell md-cell--6 query-form_lastName"
            error={lastName ? !validateNames(lastName) : false}
            errorText="Last Name is required"
            id="lastName"
            onChange={value => handleChange('lastName', value)}
            placeholder="Last Name"
            required
            type="text"
            value={lastName}
          />
          <SelectField
            className="query-form_gender md-cell md-cell--3"
            id="gender"
            menuItems={genderList}
            onChange={value => handleChange('gender', value)}
            placeholder="Gender"
            required
          />
          <DatePicker
            className="query-form_date-of-birth md-cell md-cell--4"
            error={birthDate ? !validateDOB(birthDate) : false}
            errorText="Invalid Date Of Birth"
            helpText="DD/MM/YYYY"
            id="birthDate"
            lineDirection="center"
            onChange={value => formatDOB('birthDate', value)}
            placeholder="Date Of Birth"
            required
            yearsDisplayed={234}
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

APSQueryForm.propTypes = {
  birthDate: PropTypes.string,
  fileName: PropTypes.string,
  firstName: PropTypes.string,
  formatDOB: PropTypes.func,
  gender: PropTypes.string,
  handleChange: PropTypes.func,
  lastName: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default APSQueryForm;
