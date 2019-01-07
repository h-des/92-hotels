import React, { Component } from 'react';
import { randomDate } from '../../utils/utilsFunctions';
import styled from 'styled-components';
import starIcon from '../../images/star.svg';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;
const Container = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const Rating = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #bbb;
  align-items: center;
  padding: 0 2rem;
`;
const StarIcon = styled.img`
  height: 2.5rem;
  margin-bottom: 1rem;
`;
const Rate = styled.p``;
const Review = styled.div`
  font-size: 1.4rem;
  padding: 0 2rem;
  margin-bottom: 1rem;
`;
const City = styled.h4``;
const StyledDate = styled.p`
  color: #aaa;
`;
const Text = styled.p`
  font-size: 1.6rem;
  text-align: justify;
  font-style: italic;
  color: ${props => props.theme.colors.black};
`;

const Title = styled.h3`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const formattedDate = tempDate =>
  `${tempDate.getUTCDate()}/${tempDate.getUTCMonth() +
    1}/${tempDate.getUTCFullYear()}`;

const Item = ({ from, to, stars, review, city }) => (
  <Container>
    <Rating>
      <StarIcon src={starIcon} alt="star" />
      <Rate>{stars}/5</Rate>
    </Rating>
    <Review>
      <City>{city}</City>
      <StyledDate>{from + ' - ' + to} </StyledDate>
      <Text>{review}</Text>
    </Review>
  </Container>
);

export default class Reviews extends Component {
  state = {
    items: []
  };

  componentDidMount = () => {
    let res = [];
    for (let i = 0; i < 10; i++) {
      let from = formattedDate(randomDate(new Date(2015, 0, 1), new Date()));
      let to = formattedDate(randomDate(new Date(2015, 0, 1), new Date()));
      res.push({
        from,
        to,
        stars: Math.floor(Math.random() * 6),
        city: 'Paris',
        review:
          'Repellat explicabo voluptas adipisci necessitatibus ex in in ut sit. Nemo aut sit est omnis et sit aut.'
      });
    }
    this.setState({ items: res });
  };

  renderItems = () => {
    return this.state.items.map(e => (
      <Item
        from={e.from}
        to={e.to}
        review={e.review}
        stars={e.stars}
        city={e.city}
      />
    ));
  };

  render() {
    if (this.state.items.length) {
      return (
        <React.Fragment>
          <Title>Your reviews</Title>
          <List>{this.renderItems()}</List>
        </React.Fragment>
      );
    }
    return null;
  }
}
