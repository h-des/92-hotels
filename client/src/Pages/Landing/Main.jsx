import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import backgroundPhoto from '../../images/landing.JPG';
import CarouselSliding from '../../Components/CarouselSliding';
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from '@atlaskit/select';
import moment from 'moment';
import { Button } from '../../Components/Buttons';
import { withRouter } from 'react-router-dom';

const StyledContainer = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1)),
    url(${backgroundPhoto});
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 600px) {
    background-image: linear-gradient(
        rgba(0, 0, 0, 0) 20%,
        rgba(0, 0, 0, 1) 50%
      ),
      url(${backgroundPhoto});
  }
`;

const InnerContainer = styled.div`
  width: 70%;
  margin-top: 35vh;
  @media only screen and (max-width: 600px) {
    width: 95%;
    margin-top: 15rem;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-100vh);
  }
  70% {
    transform: translateY(1rem);
  }
  90% {
    transform: translateY(0rem);
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(100vh);
  }
  70% {
    transform: translateY(-1rem);
  }
  90% {
    transform: translateY(0);
  }
`;

const BottomContainer = styled.div`
  animation: ${slideUp} 1s ease-in-out forwards;
  margin-bottom: 6rem;
`;

const Heading = styled.h2`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: white;
  animation: ${slideDown} 1s ease-in-out forwards;
`;

const SecondaryHeading = styled.h3`
  font-size: 3rem;
  margin-bottom: 4rem;
  font-weight: 400;
  color: white;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const ErrorMessage = styled.p`
  margin: 1rem 0;
  flex-basis: 100%;
  font-size: 1.4;
  padding: 1rem;
  border-left: 3px solid red;
  background-color: #fff9ed;
  color: #744f11;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  flex-basis: 25%;
  padding-right: 2rem;
  font-size: 1.4rem;

  @media only screen and (max-width: 800px) {
    width: 100%;
    margin: 0 auto;
    flex-basis: 100%;
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  margin-bottom: 10vh;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

class Main extends Component {
  selectCityFilter = city => {
    this.props.addFilters({ city });
    this.props.history.push('/hotels');
  };

  render() {
    return (
      <StyledContainer>
        <InnerContainer>
          <Heading>Find your next favourite place!</Heading>
          <BottomContainer>
            <Form {...this.props} />
            <SecondaryHeading>Get inspired</SecondaryHeading>
            <CarouselSliding
              items={this.props.tiles}
              onClick={this.selectCityFilter}
            />
          </BottomContainer>
        </InnerContainer>
      </StyledContainer>
    );
  }
}

class Form extends Component {
  state = {
    error: null,
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    roomType: null,
    city: null
  };

  handleChange = (e, name) => {
    this.setState({ [name]: e, error: null });
  };

  submitForm = e => {
    e.preventDefault();
    const { city, roomType, checkIn, checkOut } = this.state;
    if (!city || !roomType || !checkIn || !checkOut) {
      this.setState({
        error: 'Fields cannot be empty!'
      });
    } else if (new Date(checkOut) <= new Date(checkIn)) {
      return this.setState({ error: 'Invalid date!' });
    } else {
      this.props.addFilters({
        city: city.value,
        roomType: roomType.value,
        from: checkIn,
        to: checkOut
      });
      this.props.history.push('/hotels');
    }
  };

  render() {
    return (
      <StyledForm onSubmit={this.submitForm}>
        <FieldsContainer>
          <Field>
            <Label htmlFor="city">City</Label>
            <Select
              options={this.props.cities}
              name="city"
              id="city"
              value={this.state.city}
              onChange={e => this.handleChange(e, 'city')}
            />
          </Field>
          <Field>
            <Label htmlFor="checkIn">Check In</Label>
            <DatePicker
              onChange={e => this.handleChange(e, 'checkIn')}
              name="checkIn"
              value={this.state.checkIn}
              id="checkIn"
            />
          </Field>
          <Field>
            <Label htmlFor="checkOut">Check Out</Label>
            <DatePicker
              onChange={e => this.handleChange(e, 'checkOut')}
              name="checkOut"
              value={this.state.checkOut}
              id="checkOut"
            />
          </Field>
          <Field>
            <Label htmlFor="roomType">Room type</Label>
            <Select
              name="roomType"
              value={this.state.roomType}
              id="roomType"
              options={[
                { label: '1 guest', value: 1 },
                { label: '2 guests', value: 3 },
                { label: '3 guests', value: 2 },
                { label: '4 guests', value: 4 }
              ]}
              onChange={e => this.handleChange(e, 'roomType')}
            />
          </Field>
          {this.state.error && <ErrorMessage>{this.state.error}</ErrorMessage>}
        </FieldsContainer>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </StyledForm>
    );
  }
}

export default withRouter(Main);
