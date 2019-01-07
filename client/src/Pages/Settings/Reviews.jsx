import React, { Component } from 'react';
import styled from 'styled-components';
import starIcon from '../../images/star.svg';
import axios from 'axios';
import moment from 'moment';
import { SpinnerRectangles } from '../../Components/Spinner';

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

const Item = ({ date, stars, review, city, hotel }) => (
  <Container>
    <Rating>
      <StarIcon src={starIcon} alt="star" />
      <Rate>{stars}/5</Rate>
    </Rating>
    <Review>
      <City>
        {hotel}
        {', '}
        {city}
      </City>
      <StyledDate>{moment(date).format('YYYY/MM/DD')}</StyledDate>
      <Text>{review}</Text>
    </Review>
  </Container>
);

export default class Reviews extends Component {
  state = {
    reviews: null
  };

  async componentDidMount() {
    const { reviews } = this.props.user.data;
    //get all full reviews
    let arr = await Promise.all(
      reviews.map(async id => {
        try {
          const res = await axios.get(`/api/review/?id=${id}`);
          return res.data;
        } catch (err) {
          return null;
        }
      })
    );
    //filter null values
    arr = arr.filter(e => e);

    arr = await Promise.all(
      arr.map(async review => {
        try {
          const res = await axios.get(`/api/city/?hotel=${review.hotel}`);
          return { ...review, city: res.data.city, hotel: res.data.hotel };
        } catch (err) {
          return review;
        }
      })
    );

    this.setState({ reviews: arr });
  }

  render() {
    return this.state.reviews ? (
      <Items items={this.state.reviews} />
    ) : (
      <SpinnerRectangles color="blue" />
    );
  }
}

function Items({ items }) {
  return items
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(e => (
      <Item
        date={e.createdAt}
        review={e.body}
        stars={e.rate}
        city={e.city}
        hotel={e.hotel}
      />
    ));
}
