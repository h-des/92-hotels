import React, { Component } from 'react';
import loginIcon from '../../images/login_icon.svg';
import { Button } from '../../Components/Buttons';
import constants from '../../utils/constants';
import {
  ForgotLink,
  Container,
  LoginIcon,
  LoginTitle,
  StyledInput,
  StyledForm,
  StyledLabel,
  ErrorMessage
} from './StyledElements';

class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null
  };

  handleInput = e => {
    if (e.target.name === 'email') {
      if (!e.target.validity.valid) {
        this.setState({
          error: 'Please enter a valid email'
        });
      } else {
        this.setState({
          error: null
        });
      }
    }

    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn({ email, password });
  };

  render() {
    const { data } = this.props.user;
    if (data) this.props.close();
    const { error, password, email } = this.state;
    return (
      <Container>
        <LoginIcon src={loginIcon} />
        <LoginTitle>Log in to your account</LoginTitle>
        <StyledForm>
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            type="email"
            name="email"
            id="email"
            onChange={this.handleInput}
          />
          <StyledLabel htmlFor="password">Password</StyledLabel>
          <StyledInput
            type="password"
            id="password"
            name="password"
            onChange={this.handleInput}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {this.props.user.status === constants.ERROR && (
            <ErrorMessage>{this.props.user.error}</ErrorMessage>
          )}
          {password && email && !error ? (
            <Button
              margin="0 0 2rem 0"
              onClick={this.handleLogin}
              color="primary"
              loading={this.props.user.status === 'LOADING'}
            >
              Login
            </Button>
          ) : (
            <Button margin="0 0 2rem 0" color="disabled" disabled>
              Login
            </Button>
          )}
          <ForgotLink href="">Forgot your password?</ForgotLink>
          <Button onClick={this.props.newAccount} color="secondary">
            Create new account
          </Button>
        </StyledForm>
      </Container>
    );
  }
}

export default Login;
