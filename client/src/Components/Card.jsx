import React from 'react';
import styled from 'styled-components';
import { LinkButton } from './Buttons';
import Badges from './Badges';

const CardContainer = styled.div`
  height: 40rem;
  justify-self: stretch;
  overflow: hidden;
  border-radius: 1rem;
  background-color: white;
  box-shadow: 0 0.8rem 2.5rem 0 rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CardImage = styled.div`
  background-image: ${props =>
    `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.3)), url(${
      props.url
    })`};
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), 0 100%);
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 2rem;
  padding-bottom: 3rem;
  font-weight: 700;
  font-size: 2rem;
  color: white;
  transition: all 0.2s;

  ${CardContainer}:hover & {
    height: 45%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  font-size: 1.8rem;
`;

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.4rem;
`;

const PinToBottom = styled.span`
  position: absolute;
  bottom: 2rem;
`;

export default ({ image, name, city, stars, rating, _id, reviewsCount }) => (
  <CardContainer>
    <CardImage url={image}>{city}</CardImage>
    <CardInfo>
      <CardTitle>{name}</CardTitle>
      <Badges
        type="stars"
        marginBottom="1.5rem"
        count={stars || Math.floor(Math.random() * 4) + 2}
      />
      <Row>
        <Badges
          marginBottom="1.5rem"
          count={Math.floor(rating) || Math.floor(Math.random() * 4) + 2}
        />
        <span>{reviewsCount} reviews</span>
      </Row>
      <PinToBottom>
        <LinkButton to={`/hotels/${_id}`} color="primary">
          View details
        </LinkButton>
      </PinToBottom>
    </CardInfo>
  </CardContainer>
);
