import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from '../../Components/Buttons';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 12rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  padding: 3rem 0;
  font-size: 4rem;
  color: ${props => props.theme.colors.black};
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 2.4rem;
  color: ${props => props.theme.colors.black};
  margin: 0 2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;
  margin-bottom: 1rem;
`;
const Label = styled.label`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  font-size: 2rem;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  transition: all 0.2s;
  border: 1px solid gray;
  margin: 0 auto;
  outline: none;

  @media only screen and (min-width: 600px) {
    width: 50rem;
  }

  &:focus {
    border: ${props => `2px solid ${props.theme.colors.primary}`};
    box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 0.3);
  }

  &:invalid {
    border: 2px solid red;
  }
`;

export default class Subscribe extends Component {
  state = { email: '' };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    //api request
  };

  render() {
    return (
      <StyledContainer>
        <SectionTitle>Dicover more</SectionTitle>
        <Text>
          Subscribe to our newsletter and stay in touch with our best offers
        </Text>{' '}
        <Form onSubmit={this.handleSubmit}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              onChange={this.handleChange}
              id="email"
              value={this.state.email}
            />
          </Field>
          <Button type="submit" color="secondary">
            Subscribe
          </Button>
        </Form>
      </StyledContainer>
    );
  }
}
