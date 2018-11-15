import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  margin-top: 10rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);

  @media only screen and (max-width: 452px) {
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem 5rem;
  width: 67%;
  color: ${props => props.theme.colors.black};
`;

const FormTitle = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 4rem;
`;
const FormSubTitle = styled.h4`
  font-size: 2.4rem;
  font-weight: 600;
  color: #414141;
  margin-bottom: 3rem;
`;

const Total = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  background-color: #f6f6f6;
  padding-top: 13rem;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.black};
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: ${props => props.theme.colors.black};
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  font-size: 1.6rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  color: ${props => props.theme.colors.black};
  padding: 1.2rem 2rem;
  border: none;
  width: 100%;
  border-radius: 2px;
  background-color: #f1f1f1;
  margin-bottom: 2.5rem;
`;

const TotalTitle = styled.h3`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 3rem;
`;

const Price = styled.p`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 4rem;
  color: #1fb6ff;
`;

const Features = styled.ul``;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Feature = styled.li`
  font-size: 1.4rem;
  color: #4c4c4c;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  color: ${props => props.theme.colors.grey};
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const NextButton = styled.button`
  border-radius: 2rem;
  justify-self: flex-end;
  border: none;
  height: 4rem;
  width: 80px;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  font-size: 1.6rem;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background-color: #1fb6ff;
  }
`;

export default class Checkout extends Component {
  render() {
    return (
      <Container>
        <Form>
          <FormTitle>Checkout</FormTitle>
          <FormSubTitle>Personal</FormSubTitle>
          <Label>First name</Label>
          <Input />
          <Label>Last name</Label>
          <Input />
          <FormSubTitle>Contact</FormSubTitle>
          <Label>Address</Label>
          <Input />
          <Label>City</Label>
          <Input />
          <Label>Phone</Label>
          <Input />
          <BackButton>Back</BackButton>
        </Form>
        <Total>
          <FlexColumn>
            <TotalTitle>Total</TotalTitle>
            <Price>500$</Price>
            <Features>
              <Feature>2 adults</Feature>
              <Feature>2 childs</Feature>
              <Feature>All inclusive</Feature>
            </Features>
          </FlexColumn>
          <NextButton>Pay</NextButton>
        </Total>
      </Container>
    );
  }
}
