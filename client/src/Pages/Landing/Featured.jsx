import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../../Components/Card';

const StyledContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h2`
  width: 100%;
  text-align: center;
  background-color: black;
  padding: 3rem 0;
  font-size: 4rem;
  color: white;
  margin-bottom: 7rem;
  border-bottom-left-radius: 50% 20%;
  border-bottom-right-radius: 50% 20%;
`;

const InnerContainer = styled.div`
  display: grid;
  width: 114rem;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;
  margin-bottom: 12rem;

  @media only screen and (max-width: 1140px) {
    width: 90vw;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5rem;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default class Featured extends Component {
  renderCards = () => {
    return this.props.hotels.map(hotel => <Card key={hotel._id} {...hotel} />);
  };

  render() {
    return (
      <StyledContainer>
        <SectionTitle>Featured</SectionTitle>
        <InnerContainer>{this.renderCards()}</InnerContainer>
      </StyledContainer>
    );
  }
}
