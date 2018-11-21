import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const TotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 33%;
  background-color: #f6f6f6;
  padding-top: 13rem;
  padding-bottom: 5rem;
  color: ${props => props.theme.colors.black};

  @media only screen and (max-width: 625px) {
    width: 100%;
    padding-top: 2rem;
  }
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

export default class Total extends Component {
  render() {
    const { checkIn, checkOut, price, adults, children } = this.props.data;
    let a = moment(checkIn);
    let b = moment(checkOut);
    const len = Math.abs(a.diff(b, 'days'));
    const totalPrice = len * price || 0;
    return (
      <TotalContainer>
        <FlexColumn>
          <TotalTitle>Total</TotalTitle>
          <Price>{price}$</Price>
          <Features>
            <Feature>{price}$ per night</Feature>
            <Feature>From: {checkIn}</Feature>
            <Feature>To: {checkOut}</Feature>
            <Feature>
              {adults} {adults !== 1 ? 'adults' : 'adult'}
            </Feature>
            <Feature>
              {children} {children !== 1 ? 'children' : 'child'}
            </Feature>
          </Features>
        </FlexColumn>
        {this.props.children}
      </TotalContainer>
    );
  }
}
