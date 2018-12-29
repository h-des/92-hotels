import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker } from '@atlaskit/datetime-picker';
import Select from '@atlaskit/select';
import * as actions from '../actions';
import { connect } from 'react-redux';

const StyledContainer = styled.form`
  background-color: white;
  padding-top: 2rem;
  position: fixed;
  z-index: 20;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 10vh;
  width: 30rem;
  max-width: 100%;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.2);
  transform: ${props =>
    props.show ? `translateX(0px)` : `translateX(-30rem)`};
  transition: transform 0.2s;

  @media only screen and (max-width: 425px) {
    width: 100vh;
    height: 100vh;
    transform: ${props =>
      props.show ? `translateX(0px)` : `translateX(-100%)`};
  }
`;

const ItemTitle = styled.label`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.4rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  flex: 1 1 0;
  background-color: ${props =>
    props.type === 'submit'
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
  cursor: pointer;
  font-weight: 600;
  color: white;
  font-size: 2rem;
  min-height: 6rem;
  border: none;
  font-family: 'Nunito';

  &:hover {
    background-color: ${props =>
      props.type === 'submit'
        ? props.theme.colorsHover.primary
        : props.theme.colorsHover.secondary};
  }
`;

const Row = styled.div`
  display: flex;
`;

const ShowButton = styled.button`
  position: absolute;
  right: -80px;
  width: 80px;
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  border: none;
  color: white;
  padding: 1rem 1rem;
  font-weight: 600;
  font-family: 'Nunito';
  letter-spacing: 1px;
  border-top-right-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }

  @media only screen and (max-width: 425px) {
    transform: ${props => props.show && `translateX(-80px)`} translateY(-1.8rem);
    border-top-right-radius: ${props => props.show && `0px`};
    border-bottom-right-radius: ${props => props.show && `0px`};
    border-bottom-left-radius: ${props => props.show && `15px`};
  }
`;

const ErrorMessage = styled.p`
  border-left: 3px solid red;
  background-color: #fff9ed;
  color: #744f11;
  font-size: 1.6rem;
  padding: 4px 8px;
  margin-bottom: 0.5rem;
`;

class Filters extends Component {
  state = {
    error: null,
    show: false,
    showBody: false,
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    roomType: null,
    city: null
  };

  toggleFilters = e => {
    e.preventDefault();
    //delay when hiding for proper css animation
    let delay = this.state.showBody ? 200 : 0;
    this.setState(prevState => {
      return {
        show: !prevState.show
      };
    });
    setTimeout(() => {
      this.setState(prevState => {
        return {
          showBody: !prevState.showBody
        };
      });
    }, delay);
  };

  sumbitForm = e => {
    e.preventDefault();
    const { city, roomType, checkIn, checkOut } = this.state;
    if (!city || !roomType || !checkIn || !checkOut) {
      this.setState({
        error: 'Fields cannot be empty!'
      });
    } else {
      this.props.addFilters({
        city: city.value,
        roomType: roomType.value,
        from: checkIn,
        to: checkOut
      });
    }
  };

  clearFilters = e => {
    e.preventDefault();
    this.setState({
      roomType: null,
      error: null,
      city: null
    });
    this.props.removeFilters();
  };

  handleChange = (e, name) => {
    this.setState({ [name]: e, error: null });
  };

  render() {
    const { show, showBody, error } = this.state;
    return (
      <StyledContainer show={show}>
        {show ? (
          <ShowButton show={show} onClick={this.toggleFilters}>
            X
          </ShowButton>
        ) : (
          <ShowButton show={show} onClick={this.toggleFilters}>
            Filters
          </ShowButton>
        )}
        {showBody && (
          <React.Fragment>
            <Item>
              <ItemTitle htmlFor="city">City</ItemTitle>
              <Select
                value={this.state.city}
                name="city"
                onChange={e => this.handleChange(e, 'city')}
                options={this.props.cities}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="checkIn">Check in</ItemTitle>
              <DatePicker
                id="checkIn"
                value={this.state.checkIn}
                name="checkIn"
                onChange={e => this.handleChange(e, 'checkIn')}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="checkOut">Check out</ItemTitle>
              <DatePicker
                id="checkOut"
                value={this.state.checkOut}
                name="checkOut"
                onChange={e => this.handleChange(e, 'checkOut')}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="roomType">Room type</ItemTitle>
              <Select
                name="roomType"
                value={this.state.roomType}
                onChange={e => this.handleChange(e, 'roomType')}
                options={[
                  { label: 1, value: 1 },
                  { label: 2, value: 2 },
                  { label: 3, value: 3 },
                  { label: 4, value: 4 }
                ]}
              />
            </Item>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Row>
              <Button type="submit" onClick={this.sumbitForm}>
                Submit
              </Button>
              <Button onClick={this.clearFilters}>Clear</Button>
            </Row>
          </React.Fragment>
        )}
      </StyledContainer>
    );
  }
}

export default withRouter(
  connect(
    null,
    actions
  )(Filters)
);
