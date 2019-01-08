import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heartIcon from './../../images/heart.svg';
import Badges from '../../Components/Badges';

const Card = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  border-radius: 0.8rem;
  box-shadow: 0px 1.1rem 2.6rem 0px rgba(0, 0, 0, 0.09);
  margin-bottom: 7.5rem;
  background-color: white;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const calcImgHeight = url => url.split('&h=200').join('&h=450');

const CardImage = styled.div`
  width: 75%;
  background-image: url(${props => calcImgHeight(props.image)});
  background-position: center;
  background-size: 60rem 45rem;
  transition: all 0.15s;

  :hover {
    background-size: 67rem 50rem;
  }

  @media only screen and (max-width: 600px) {
    min-height: 30vh;
    width: 100%;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7rem;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;

  @media only screen and (max-width: 860px) {
    padding: 5rem;
  }

  @media only screen and (max-width: 680px) {
    padding: 5rem;
  }

  @media only screen and (max-width: 480px) {
    padding: 3rem;
  }
`;

const CardTitle = styled(Link)`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.black};
  margin-bottom: 1.5rem;
  line-height: 1;
  text-decoration: none;

  :hover {
    color: ${props => props.theme.colors.primary};
  }

  @media only screen and (max-width: 480px) {
    font-size: 1.8rem;
  }
`;
const CardDesc = styled.p`
  font-size: 2rem;
  text-transform: capitalize;
  font-weight: 600;
  color: ${props => props.theme.colors.grey};
  margin-bottom: 5rem;

  @media only screen and (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 3rem;
  }
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Detail = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  font-weight: 400;
`;

const Separator = styled.span`
  display: inline-block;
  // height: 20px;
  width: 2px;
  background-color: ${props => props.theme.colors.primary};
`;

const Icon = styled.img`
  height: 2rem;
  margin-left: 5px;
`;

const LoveButton = styled.button`
  height: 7.5rem;
  width: 7.5rem;
  border-radius: 50%;
  box-shadow: 0px 0.5rem 1.2rem 0px rgba(0, 0, 0, 0.1);
  position: absolute;
  bottom: 5rem;
  background-color: white;
  left: -4rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 0.5rem 2rem 0px rgba(0, 0, 0, 0.2);
  }

  @media only screen and (max-width: 600px) {
    top: -3.5rem;
    right: 3rem;
    bottom: auto;
    left: auto;
    height: 5.5rem;
    width: 5.5rem;
  }
`;

export default class HotelCard extends Component {
  likeRoom = id => {
    //
    console.log(`You liked room ${id}`);
  };

  render() {
    const { _id, name, city, stars, rating, image } = this.props.data;
    return (
      <Card>
        <CardImage image={image} />
        <CardBody>
          <LoveButton onClick={() => this.likeRoom(_id)}>
            <Icon src={heartIcon} />
          </LoveButton>
          <FlexColumn>
            <CardTitle to={`/hotels/${_id}`}>{name}</CardTitle>
            <CardDesc>{city}</CardDesc>
          </FlexColumn>
          <CardDetails>
            <Detail>
              <Badges type="stars" count={stars} />
              {stars} {stars > 1 ? 'stars' : 'star'}
            </Detail>
            <Separator />
            <Detail>
              <Badges count={Math.floor(rating)} />
              {rating}/5
            </Detail>
          </CardDetails>
        </CardBody>
      </Card>
    );
  }
}
