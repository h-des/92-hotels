import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import { SpinnerRectangles } from './../../Components/Spinner';

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const Container = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  :not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;
const StyledDate = styled.p`
  color: #aaa;
`;

const City = styled.h3`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Item = ({ from, to, hotel, city }) => (
  <Container>
    <City>
      {hotel}
      {', '}
      {city}
    </City>
    <StyledDate>
      {moment(from).format('YYYY/MM/DD')} - {moment(to).format('YYYY/MM/DD')}
    </StyledDate>
    <hr />
  </Container>
);

export default class History extends Component {
  state = {
    bookings: null
  };
  async componentDidMount() {
    const { bookings } = this.props.user.data;
    if (bookings.length < 1) {
      return null;
    }
    let arr = await Promise.all(
      bookings.map(async booking => {
        try {
          const res = await axios.get(`/api/booking/${booking}`);
          return res.data;
        } catch (err) {
          return null;
        }
      })
    );
    arr = await Promise.all(
      arr.map(async booking => {
        try {
          const res = await axios.get(`/api/city/?hotel=${booking.hotel}`);
          return { ...booking, city: res.data.city, hotel: res.data.hotel };
        } catch (err) {
          return booking;
        }
      })
    );

    this.setState({ bookings: arr });
  }

  render() {
    return this.state.bookings ? (
      <List>
        <Items items={this.state.bookings} />
      </List>
    ) : (
      <SpinnerRectangles color="blue" />
    );
  }
}

function Items({ items }) {
  return items
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(e => <Item {...e} />);
}
