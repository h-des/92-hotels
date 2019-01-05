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

const Features = styled.ul`
  list-style: none;
`;

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
    const { from: checkIn, to: checkOut, price, roomType } = this.props.data;
    let a = moment(checkIn);
    let b = moment(checkOut);
    const len = Math.abs(a.diff(b, 'days'));
    const breakfastPrice = this.props.breakfast ? roomType * len * 10 : 0;
    const totalPrice = len * price + breakfastPrice || 0;
    return (
      <TotalContainer>
        <FlexColumn>
          <TotalTitle>Total</TotalTitle>
          <Price>{totalPrice}$</Price>
          <Features>
            <Feature>{price}$ per night</Feature>
            <Feature>From: {checkIn}</Feature>
            <Feature>To: {checkOut}</Feature>
            <Feature>Room type: {roomType}</Feature>
          </Features>
        </FlexColumn>
        {this.props.children}
      </TotalContainer>
    );
  }
}
