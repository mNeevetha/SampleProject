import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-md/lib/Buttons/Button';
import Paper from 'react-md/lib/Papers';
import TextField from 'react-md/lib/TextFields';

import { validateEmail } from '../utils/inputValidations';

import '../assets/stylesheets/LoginForm.scss';

const LoginForm = ({ email, handleChange, onSubmit, password }) => {

  const formValid = () => {
    return validateEmail(email) && password.length;
  };

  return (
    <Paper className="login-form md-block-centered" zDepth={1}>
      <form className="md-grid">
        <div><h2 className="login-form_title">Login</h2></div>
        <TextField
          className="md-cell md-cell--12 login-form_email"
          error={email ? !validateEmail(email) : false}
          errorText="Enter a valid email"
          id="email"
          onChange={value => handleChange('email', value)}
          placeholder="Email"
          type="text"
          value={email}
        />
        <TextField
          className="md-cell md-cell--12 login-form_password"
          errorText="Password is required"
          id="password"
          onChange={value => handleChange('password', value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
        <a className="login-form_sign-up" href="/register">
          Need an account?
          <span className="md-font-bold"> Sign up &gt;&gt; </span>
        </a>
        <div className="login-form_submit">
          <Button
            disabled={!formValid()}
            id="submit"
            label="Submit"
            onClick={onSubmit}
            raised
            secondary
          />
        </div>
      </form>
    </Paper>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string,
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func,
  password: PropTypes.string,
};

export default LoginForm;
