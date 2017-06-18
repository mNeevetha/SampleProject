import PropTypes from 'prop-types';
import React from 'react';
import Paper from 'react-md/lib/Papers';
import TextField from 'react-md/lib/TextFields';
import SelectField from 'react-md/lib/SelectFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

import '../assets/stylesheets/QueryForm.scss';

const gender = ["Male", "Female"];
const QueryForm = ({ firstName, middleName, lastName, handleChange }) => {


  return (
    <Paper className="query-form md-block-centered md-cell--8" zDepth={1}>
      <div><h2 className="query-form_title">Applicant Search Refinement<label className="md-caption">*REQUIRED FIELDS</label></h2>
      </div>

      <form className="md-grid">

        <TextField
          className="md-cell md-cell--5 query-form_firstName"
          id="firstName"
          onChange={value => handleChange('firstName', value)}
          placeholder="First Name"
          type="text"
          value={firstName}
          required
        />

        <TextField
          className="md-cell md-cell--2 query-form_middleName"
          id="middleName"
          onChange={value => handleChange('middleName', value)}
          placeholder="Middle Initial"
          type="text"
          value={middleName}
        />


        <TextField
          className="md-cell md-cell--5 query-form_lastName"
          id="lastName"
          onChange={value => handleChange('lastName', value)}
          placeholder="Last Name"
          type="text"
          value={lastName}
          required
        />

        <SelectField
          className="query-form_gender md-cell md-cell--bottom md-cell--2"
          id="query-form_gender"
          defaultValue={gender[0]}
          menuItems={gender}
          required
        />

        <DatePicker
          id="query-form_date-picker"
          label="MM/DD/YYYY"
          lineDirection="center"
          className="query-form_date-picker md-cell md-cell--5"
        />


        <TextField
          id="query-form_phone"
          label="Primary Phone Number*"
          type="tel"
          size={10}
          required
          className="query-form_phone md-cell md-cell--bottom md-cell--5"
        />
        <TextField
          className="md-cell md-cell--5 query-form_firstname"
          id="firstName"
          onChange={value => handleChange('firstName', value)}
          placeholder="firstName"
          type="text"
          value={firstName}
        />
        <TextField
          className="md-cell md-cell--5 query-form_firstname"
          id="firstName"
          onChange={value => handleChange('firstName', value)}
          placeholder="firstName"
          type="text"
          value={firstName}
        />



      </form>
    </Paper>
  );
};

QueryForm.propTypes = {
  firstName: PropTypes.string,
  handleChange: PropTypes.func
};

export default QueryForm;
