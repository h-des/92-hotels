import React, { Component } from 'react';
import styled from 'styled-components';
import loginIcon from '../images/login_icon.svg';
import { Button } from '../Components/Buttons';
import { connect } from 'react-redux';
import * as actions from '../actions';

const Contaier = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginIcon = styled.img`
  height: 10rem;
  margin-bottom: 2.5rem;
`;

const LoginTitle = styled.h3`
  color: #000e50;
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const StyledInput = styled.input`
  border: 2px solid #13ce66;
  border-radius: 5px;
  margin-bottom: 2rem;
  height: 5rem;
  padding: 0 2rem;
  font-size: 2rem;
  color: #5a5a5a;
  font-weight: 700;

  &:invalid {
    border: 2px solid #ff3636;
  }
`;

const StyledLabel = styled.label`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #5a5a5a;
  font-weight: 600;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;
  max-width: 90vw;
  text-align: left;
`;

const ErrorMessage = styled.p`
  border-left: 3px solid red;
  background-color: #fff9ed;
  color: #744f11;
  font-size: 1.6rem;
  padding: 4px 8px;
`;

const ForgotLink = styled.a`
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  color: #5a5a5a;

  &:hover {
    color: ${props => props.theme.colors.black};
    text-decoration: underline;
  }

  &:visited {
    text-decoration: none;
  }
`;

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
    this.props.fetchUser();
  };

  handleNewAccount = e => {
    e.preventDefault();
  };

  render() {
    const { data } = this.props.user;
    if (data) this.props.close();
    const { error, password, email } = this.state;
    return (
      <Contaier>
        <LoginIcon src={loginIcon} />
        <LoginTitle>Log in to your account</LoginTitle>
        <StyledForm>
          <StyledLabel htmlFor="">Email</StyledLabel>
          <StyledInput type="email" name="email" onChange={this.handleInput} />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledLabel htmlFor="">Password</StyledLabel>
          <StyledInput
            type="password"
            name="password"
            onChange={this.handleInput}
          />
          {password && email && !error ? (
            <Button
              margin="0 0 2rem 0"
              onClick={this.handleLogin}
              color="primary"
            >
              Login
            </Button>
          ) : (
            <Button margin="0 0 2rem 0" color="disabled" disabled>
              Login
            </Button>
          )}
          <ForgotLink href="">Forgot your password?</ForgotLink>
          <Button onClick={this.handleNewAccount} color="secondary">
            Create new account
          </Button>
        </StyledForm>
      </Contaier>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  actions
)(Login);
