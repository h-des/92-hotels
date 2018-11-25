import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { NumberInput } from './Inputs';
import { DatePicker } from '@atlaskit/datetime-picker';

const StyledContainer = styled.form`
  background-color: white;
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
    transform: ${props =>
      props.show ? `translateX(0px)` : `translateX(-100%)`};
  }
`;

const ItemTitle = styled.label`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const StyledInput = styled.input`
  font-family: 'Nunito', sans-serif;
  font-size: 1.6rem;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding-left: 1rem;
  width: 100%;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 3.5rem;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  font-weight: 600;
  color: white;
  font-size: 20px;
  min-height: 100px;
  border: none;
  font-family: 'Nunito';

  &:hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }
`;

const ShowButton = styled.button`
  position: absolute;
  right: -80px;
  width: 80px;
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  border: none;
  color: white;
  padding: 10px 10px;
  font-weight: 600;
  font-family: 'Nunito';
  letter-spacing: 1px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colorsHover.primary};
  }

  @media only screen and (max-width: 425px) {
    transform: ${props => props.show && `translateX(-80px)`};
    border-top-right-radius: ${props => props.show && `0px`};
    border-bottom-right-radius: ${props => props.show && `0px`};
    /* border-top-left-radius: ${props => props.show && `15px`}; */
    border-bottom-left-radius: ${props => props.show && `15px`};
  }
`;

class FindRoom extends Component {
  state = {
    show: false,
    showBody: false,
    checkIn: moment().format('YYYY-MM-DD'),
    checkOut: moment()
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    adults: 0,
    children: 0,
    allIncusive: false
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

    //fake api call
    this.props.history.push('rooms');
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (
      (name === 'adults' || name === 'children') &&
      value < 0 &&
      !isNaN(value)
    ) {
      this.setState({
        [name]: 0
      });
    } else if (!isNaN(value)) {
      this.setState({
        [name]: value
      });
    }
  };

  handleDateChange = (e, name) => {
    this.setState({ [name]: e });
  };

  stepUp = (e, name) => {
    e.preventDefault();
    this.setState(prevState => {
      return {
        [name]: parseInt(prevState[name], 10) + 1
      };
    });
  };

  stepDown = (e, name) => {
    e.preventDefault();
    if (this.state[name] > 0) {
      this.setState(prevState => {
        return {
          [name]: parseInt(prevState[name], 10) - 1
        };
      });
    }
  };

  render() {
    const { show, showBody } = this.state;
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
              <ItemTitle htmlFor="checkIn">Check in</ItemTitle>
              <DatePicker
                id="checkIn"
                value={this.state.checkIn}
                name="checkIn"
                onChange={e => this.handleDateChange(e, 'checkIn')}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="checkOut">Check out</ItemTitle>
              <DatePicker
                id="checkOut"
                value={this.state.checkOut}
                name="checkOut"
                onChange={e => this.handleDateChange(e, 'checkOut')}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="adults">Adults</ItemTitle>
              <NumberInput
                fieldName={'adults'}
                currentValue={this.state.adults}
                onPlusClick={this.stepUp}
                onChangeEvent={this.handleChange}
                onMinusClick={this.stepDown}
              />
            </Item>
            <Item>
              <ItemTitle htmlFor="children">Children</ItemTitle>
              <NumberInput
                fieldName={'children'}
                onChangeEvent={this.handleChange}
                currentValue={this.state.children}
                onPlusClick={this.stepUp}
                onMinusClick={this.stepDown}
              />
            </Item>
            <SubmitButton type="submit" onClick={this.sumbitForm}>
              Submit
            </SubmitButton>
          </React.Fragment>
        )}
      </StyledContainer>
    );
  }
}

export default withRouter(FindRoom);
